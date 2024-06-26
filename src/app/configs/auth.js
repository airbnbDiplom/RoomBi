import GoogleProfile from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { authLogin } from '@/app/services/authConfig'
import { checkTokenExpiration } from '@/app/services/jwtDecoder'
import { refreshToken } from '@/app/services/refreshTokenService'

class RequestUser {
	constructor(email, password, type, name, phoneNumber, dateOfBirth, country) {
		this.email = email
		this.password = password
		this.type = type
		this.name = name
		this.phoneNumber = phoneNumber
		this.dateOfBirth = dateOfBirth
		this.country = country
	}
}


let tempName = null;
let tempEmail = null;
export const authConfig = {
	providers: [
		GoogleProfile({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		Credentials({
			credentials: {
				token: { label: 'Token', type: 'text' },
				refreshToken: { label: 'Refresh Token', type: 'text' },
				email: { label: 'Email', type: 'email', required: true },
				password: { label: 'Password', type: 'password' },
				type: { label: 'Type' },
				name: { label: 'Name', type: 'text' },
				phoneNumber: { label: 'Phone Number', type: 'text' },
				dateOfBirth: { label: 'Date of Birth', type: 'date' },
				country: { label: 'Country', type: 'text' },
				profile: { label: 'Profile', type: 'profile' },
			},
			async authorize(credentials) {
				console.log('credentials', credentials)
				if (credentials.token && credentials.refreshToken) {
					const sessionUser = {
						name: credentials.token,
						email: credentials.refreshToken,
						image: 'not google',
					}
					console.log('profile'. sessionUser)
					return sessionUser
				}
				if (!credentials?.email || !credentials?.password) return null

				const user = {
					email: credentials?.email.toString(),
					password: credentials?.password,
					type: credentials?.type,
					name: credentials?.name,
					phoneNumber: credentials?.phoneNumber,
					dateOfBirth: credentials?.dateOfBirth,
					country: credentials?.country,
				}

				const requestUser = new RequestUser(
					user.email,
					user.password,
					user.type,
					user.name,
					user.phoneNumber,
					user.dateOfBirth,
					user.country
				)
				const res = await authLogin(requestUser)
				console.log('Content-Type:', res.headers.get('content-type'))
				console.log(res.status)
				if (
					res.headers.get('content-type') &&
					res.headers.get('content-type').includes('application/json')
				) {
					try {
						if (res.status === 400) {
							console.log('Error 0000', res.status)
							const error = new Error('Помилка: неправильні дані')
							error.status = 400
							throw error
						}
						const response = await res.json()
						const { token, refreshToken } = response
						if (response && response.error) {
							return null
						}
						if (res.status === 200 && Array.isArray(response)) {
							const countries = response.map(country => {
								return {
									name: country.name,
									countryCode: country.countryCode,
								}
							})

							const newRes = { ...res, countries }

							return { data: newRes }
						}

						if (res.status === 200 && response.token && response.refreshToken) {
							const sessionUser = {
								name: response.token,
								email: response.refreshToken,
								image: 'not google',
							}
							return sessionUser
						}
						return null
					} catch (err) {
						console.error('Error parsing JSON response:', err)
						return null
					}
				} else {
					if (res.status === 200) {
						const textResponse = await res.text()
						const error = new Error(textResponse)
						error.status = 400
						throw error
					} else if (res.status === 400) {
						console.log('Error 0000', res.status)
						const textResponse = await res.text()
						const error = new Error(textResponse)
						error.status = 400
						throw error
					}
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, account, profile, isNewUser }) {
			const isTokenExpired = checkTokenExpiration(token.name)
			if (isTokenExpired) {
				const authenticationResponseDTO = {
					token: token.name,
					refreshToken: token.email,
				}
				const newToken = await refreshToken(authenticationResponseDTO)
				if (newToken) {
					token.name = newToken.responseData.token
					tempName = newToken.responseData.token
					token.email = newToken.responseData.refreshToken
					tempEmail = newToken.responseData.refreshToken
				}
			}
		
			return token
		},
		async session({ session, user, token }) {
			if (tempName && tempEmail) {
				session.user.name = tempName
				session.user.email = tempEmail
				session.user.image = 'not google'
				tempName = null
				tempEmail = null
			}
			if (session.user.image !== 'not google') {
				const requestUser = new RequestUser(
					session.user.email,
					'password',
					'google',
					session.user.name
				)
				const res = await authLogin(requestUser)
				if (res.ok) {
					const response = await res.json()
					const { token, refreshToken } = response
					const sessionUser = {
						name: token,
						email: refreshToken,
						image: 'not google',
					}
					session.user = sessionUser
				}
			}
			return session
		},
	},
}

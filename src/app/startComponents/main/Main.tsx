import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Row } from 'react-bootstrap'
import { CardBi } from '../../components/card/CardBi'
import style from './main.module.css'

import { cardData } from '../../tempData/data'

const Main: React.FC = () => {
	return (
		<div className={style.container}>
			<Row>
				{cardData.map((item, index) => {
					return (
						<Col
							key={item.id}
							xs={{ span: 12 }}
							sm={{ span: 6 }}
							md={{ span: 4 }}
							lg={{ span: 3 }}
							xl={{ span: 2 }}
						>
							<CardBi {...item} />
						</Col>
					)
				})}
				{cardData.map((item, index) => {
					return (
						<Col
							key={item.id}
							xs={{ span: 12 }}
							sm={{ span: 6 }}
							md={{ span: 4 }}
							lg={{ span: 3 }}
							xl={{ span: 2 }}
						>
							<CardBi {...item} />
						</Col>
					)
				})}
				{cardData.map((item, index) => {
					return (
						<Col
							key={item.id}
							xs={{ span: 12 }}
							sm={{ span: 6 }}
							md={{ span: 4 }}
							lg={{ span: 3 }}
							xl={{ span: 2 }}
						>
							<CardBi {...item} />
						</Col>
					)
				})}
			</Row>
		</div>
	)
}

export { Main }

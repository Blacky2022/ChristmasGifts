import { useEffect, useState } from 'react'
import { Spinner } from '../Common/Spinner/Spinner'
import { ListChildrenRes } from 'types'
import { ChildrenTable } from './ChildrenTable'

export const ChildrenList = () => {
	const [data, setData] = useState<ListChildrenRes | null>(null)

	const refreshGifts = async () => {
		;(async () => {
			setData(null)
			const res = await fetch('http://localhost:3001/child')
			const data = await res.json()
			setData(data)
		})()
	}
	useEffect(() => {
		refreshGifts()
	}, [])
	if (data === null) {
		return <Spinner />
	}

	return (
		<>
			<h1>Gifts</h1>
			<ChildrenTable  giftsList={data.giftsList}  childrenList={data.childrenList} />
		</>
	)
}

import { useEffect, useState } from 'react'
import { Spinner } from '../Common/Spinner/Spinner'
import { ListChildrenRes } from 'types'
import { ChildrenTable } from './ChildrenTable'
import './ChildrenList.css'
export const ChildrenList = () => {
	const [data, setData] = useState<ListChildrenRes | null>(null)

	const refreshGifts = async () => {
		setData(null)
		const res = await fetch('http://localhost:3001/child')
		setData(await res.json())
	} 
	useEffect(() => {
		refreshGifts()
	}, [])
	if (data === null) {
		return <Spinner />
	}

	return (
		<div className='container'>
			<h1>Zaktualizuj prezent</h1>
			<ChildrenTable giftsList={data.giftsList} childrenList={data.childrenList} />
		</div>
	)
}

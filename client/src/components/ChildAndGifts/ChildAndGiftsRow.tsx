interface Props {
	child: string
	gift: string | null
}

export const ChildrenAndGiftsRow = (props: Props) => (
	<tr>
		<td>{props.child}</td>
		<td>{props.gift !== null ? props.gift : 'Nie wybrano prezentu'}</td>
	</tr>
)

import { Header } from '../components/Header/Header'
import { ChildAndGiftsTable } from '../components/ChildAndGifts/ChildAndGiftsTable'
import { AuthProvider } from '../components/AuthProvider'

export const SummaryView = () => (
	<AuthProvider>
		<Header />
		<ChildAndGiftsTable />
	</AuthProvider>
)

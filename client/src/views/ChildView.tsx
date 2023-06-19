import { Header } from '../components/Header/Header'
import { AddChild } from '../components/AddChild/AddChild'
import { ChildrenList } from '../components/Children/ChildrenList'
import { AuthProvider } from '../components/AuthProvider'

export const ChildView = () => (
	<AuthProvider>
		<Header />
		<ChildrenList />
		<AddChild />
	</AuthProvider>
)

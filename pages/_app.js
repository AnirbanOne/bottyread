import '@/styles/globals.css'
import {SWRConfig} from 'swr'
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from '@clerk/nextjs';
import Nav from '@/components/Nav';


export default function App({Component, pageProps}) {


	
	return (
		<ClerkProvider {...pageProps}>

		<SWRConfig
			value={{
				fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
			}}
		>
		<Nav/>
			<Component {...pageProps} />
			<Toaster />
		</SWRConfig>
		</ClerkProvider>
		
	)
}

import { getAddressesAction } from '@/actions/addresses'
import { authAction } from '@/actions/user'
import Account from '@/components/Account'
import NoAccount from '@/components/NoAccount'

const Page = async () => {
  const auth= await authAction()
  console.log(auth);
  const addresses = await getAddressesAction(auth.data?.userid)
  
  return (
    <div>
      {auth.status===200&&auth.data?<Account authData={auth.data} addressesData={addresses.data}/>:<NoAccount/>}
    </div>
  )
}

export default Page
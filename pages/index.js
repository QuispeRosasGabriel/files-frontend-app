import { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';

const Index = () => {

  const AuthContext = useContext(authContext);
  const { usuarioAutenticado } = AuthContext;

  useEffect(() => {
    usuarioAutenticado();
  }, [])

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
            aca
          <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
          
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Index;
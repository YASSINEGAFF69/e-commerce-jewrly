import { getUserByEmail, createUser, getProducts } from "@/sanity/sanity-utils";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { currentUser } from '@clerk/nextjs';

export default async function Home() {
  const user = await currentUser();

  if (!user) return <div>Not logged in</div>;

  const existingUser = await getUserByEmail(user?.emailAddresses[0]?.emailAddress);

  if (existingUser.length === 0) {
    await createUser({
      name: user?.firstName,
      email: user?.emailAddresses[0]?.emailAddress,
      user: user
    });
  }

  const products = await getProducts();

  return (
    <div>
      <Header />

      <div className="flex flex-col items-center justify-center mt-10 space-y-4">
        <h1 className="text-4xl font-bold text-[#6E4F3F] text-center">Best seller Handmade Jewelry</h1>
        <p className="text-center text-2xl text-gray-500">We add a classy touch to your look✨</p>
      </div>

      <div className='flex p-10'>
        <div className="products-container">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

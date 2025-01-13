import { CountryList } from "./components/CountryList";
import { getData } from "./lib/getData";

export default async function Home() {
  const countries = await getData();

  return (
    <main>
      <h1 className="py-6 text-center text-4xl font-semibold">Country List</h1>
      <CountryList countryList={countries} />
    </main>
  );
}

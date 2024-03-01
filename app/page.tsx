import NavBar from "./NavBar"
import Pagination from "./components/Pagination"

export default function Home() {
  return (
    <div>
      <h3>Hello world!</h3>
      <Pagination itemCount={100} pageSize={10} currentPage={10} />
    </div>
  )
}

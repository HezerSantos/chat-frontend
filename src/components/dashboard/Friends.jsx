import '../../assets/styles/Friends.css'

import SearchBar from '../Friends/SearchBar'
import SearchElement from '../Friends/SearchElement'
import UserElement from '../Friends/UserElement'
const Friends = () => {
    return(
        <>
        <main className="friends__page">
            <section className='search__bar'>
                <SearchBar />
            </section>
            <section className='search__suggested'>
                <p>Suggested</p>
                <div>
                    <UserElement />
                    <UserElement />
                    <UserElement />
                    <UserElement />
                    <UserElement />
                    <UserElement />
                    <UserElement />
                    <UserElement />
                </div>
            </section>
            <section className='search__results'>
                <h1>Results for Gerome Powel: </h1>
                <div>
                    <SearchElement />
                    <SearchElement />
                    <SearchElement />
                    <SearchElement />
                    <SearchElement />
                </div>
            </section>
        </main>
        </>
    )
}

export default Friends
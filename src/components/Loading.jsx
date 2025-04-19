import { AiOutlineLoading } from "react-icons/ai"
const Loading = () => {
    return(
        <>
            <section className="loading__screen grid__loading">
                <AiOutlineLoading className="loading" />
            </section>
        </>
    )
}

export default Loading
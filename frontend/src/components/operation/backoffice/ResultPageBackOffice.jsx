
function ResultPageBackOffice(props) {

    const returnSearch = () => {
        props.back(2);
    }

    return (
        <div>
            ResultPage
            <button onClick={returnSearch}>Home</button>
        </div>
    )
}

export default ResultPageBackOffice;
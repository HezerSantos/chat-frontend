import '../../assets/styles/AddGroup.css'
const AddGroup = () => {
    return(
        <>
        <form className='add__group'>
            <div>
                <label htmlFor="group__name">Create Group</label>
                <div>
                    <input type="text" id='group__name' name='groupName'/>
                    <button>
                        Create
                    </button>
                </div>
            </div>
        </form>
        </>
    )
}

export default AddGroup
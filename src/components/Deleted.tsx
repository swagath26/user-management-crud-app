import success from '../assets/img/success.png';

const Deleted = () => {
    return (
        <div className="flex gap-4 pt-8 pb-20 flex-col items-center justify-center">
            <img className='m-4 p-4' src={success} width='150' height='150' />
            <h1 className='text-3xl font-medium text-slate-900'>Thank You</h1>
            <p className='text-slate-500 text-lg'>User info is successfully deleted..</p>
        </div>
    )
}

export default Deleted;
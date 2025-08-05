
import NewsList from '@/components/news/newslist'



const News = () => {

  return (
    <div className='py-12'>

      <h2 className='text-2xl font-bold mb-8 text-center'>
        Latest FPL News
      </h2>
      <NewsList />

      {/* Add more content or components related to news here */}
    </div>

  )
}

export default News
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../carousel'
import { Button } from '../button'


const Category = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "DevOps Engineer",
    "Machine Learning Engineer",
    "Artificial Intelligence Engineer",
    "Cybersecurity Engineer",
    "Product Manager",
    "UI/UX Designer"
]

const Categories = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
      <h1 className='text-2xl sm:text-3xl font-bold text-center text-blue-600 my-2'>
        Categories
      </h1>
      <p className='text-sm sm:text-base text-center text-gray-600 mb-8'>Explore Our Extensive Job Market</p>
      
      <div className="relative max-w-4xl mx-auto px-8 sm:px-12">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
             {Category.map((category, index) => (
               <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 flex justify-center">
                 <Button 
                   variant="outline" 
                   className="w-full py-6 text-sm sm:text-base font-semibold border-2 border-blue-100 hover:border-blue-600 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition shadow-sm rounded-xl whitespace-nowrap px-4"
                 >
                   {category}
                 </Button>
               </CarouselItem>
             ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </div>
  )
}

export default Categories
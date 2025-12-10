import { Link } from 'react-router-dom';
import '../assets/hero.jpg'

const Home = () => {
    return (
        <div >
            <HeroSection />
        </div>
    );
};

const HeroSection = () => {
    return (
        <div className="relative">
            <section className="relative h-screen min-h-[600px] w-full overflow-hidden">

                <div className="absolute inset-0 w-full h-full">
                    <img
                        src="/src/assets/hero.jpg"
                        alt="Delicious food delivery"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                <div className="container mx-auto h-full flex items-center relative z-10 px-6">
                    <div className="max-w-2xl text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            Craving something
                            <span className="text-primary-300"> delicious?</span> We deliver!
                        </h1>
                        <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-lg mx-auto lg:mx-0">
                            Get your favorite meals from top restaurants in minutes.
                            Fast, reliable, and always fresh - satisfaction guaranteed!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                to="/restaurant"
                                className="px-8 py-3 text-lg font-semibold rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors shadow-md"
                            >
                                Order Now
                            </Link>
                            <Link
                                to="/newrestaurant"
                                className="px-8 py-3 text-lg font-semibold rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors shadow-md"
                            >
                                Add Your Restaurant
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
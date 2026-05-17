import { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const position = [23.6850, 90.3563];
    const serviceCenters = useLoaderData();
    const mapRef = useRef(null);
    
    const handleSearch = e => {
        e.preventDefault();
        const location = e.target.location.value;
       
        const district = serviceCenters.find(c => c.district.toLowerCase().includes(location.toLowerCase()));

        if (district) {
            const coord = [district.latitude, district.longitude];
            mapRef.current.flyTo(coord, 14);
        }
    }

    return (
        <div className='p-4 md:p-8 max-w-7xl mx-auto space-y-10 flex flex-col'>
            <h2 className="text-4xl md:text-5xl font-extrabold text-secondary text-center mt-6">
                We are available in 64 districts
            </h2>
            
            <div className="w-full max-w-xl mx-auto">
                {/* search  */}
                <form onSubmit={handleSearch} className="flex gap-3">
                    <label className="input input-bordered flex items-center gap-2 grow rounded-full shadow-sm px-5">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" className="grow focus:outline-none" name="location" placeholder="Search for your district..." />
                    </label>
                    <button type="submit" className="bg-primary text-secondary px-6 md:px-8 py-3 rounded-full font-bold shadow-md hover:opacity-90 transition-opacity">
                        Search
                    </button>
                </form>
            </div>
            
            {/* Map Container */}
            <div className='border-4 border-white w-full h-125 md:h-150 rounded-3xl overflow-hidden shadow-lg'>
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className='w-full h-full'
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        serviceCenters.map((center, index) => <Marker
                            key={index}
                            position={[center.latitude, center.longitude]}>
                            <Popup>
                                <strong>{center.district}</strong> <br /> Service Area: {center.covered_area.join(', ')}.
                            </Popup>
                        </Marker>)
                    }

                </MapContainer>
            </div>


        </div>
    );
};

export default Coverage;
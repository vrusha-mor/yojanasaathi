import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
    userState?: string;
    userDistrict?: string;
}

// Helper to update map center when props change
function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    map.setView(center, 12); // Default zoom
    return null;
}

const MOCK_OFFICES = [
    { name: "District Collectorate", offset: [0.005, 0.005] },
    { name: "Taluka Office", offset: [-0.005, -0.005] },
    { name: "Krishi Bhavan", offset: [0.005, -0.005] },
    { name: "Municipal Corporation", offset: [-0.005, 0.005] },
    { name: "Social Welfare Office", offset: [0.01, 0] }
];

export const MapComponent: React.FC<MapComponentProps> = ({ userState, userDistrict }) => {
    const [search, setSearch] = useState('');
    const [center, setCenter] = useState<[number, number]>([20.5937, 78.9629]); // India default
    const [offices, setOffices] = useState<Array<{ id: number, name: string, position: [number, number] }>>([]);
    const [loading, setLoading] = useState(false);

    // Initialize based on userState/District
    useEffect(() => {
        if (userDistrict && userState) {
            handleSearch(`${userDistrict}, ${userState}`);
            setSearch(`${userDistrict}, ${userState}`);
        } else if (userState) {
            handleSearch(userState);
            setSearch(userState);
        }
    }, [userState, userDistrict]);

    const handleSearch = async (query: string) => {
        if (!query) return;
        setLoading(true);

        try {
            // Geocode using OpenStreetMap Nominatim API
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
            const data = await response.json();

            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                const newCenter: [number, number] = [lat, lon];

                setCenter(newCenter);
                generateMockOffices(newCenter);
            }
        } catch (error) {
            console.error("Geocoding failed", error);
        } finally {
            setLoading(false);
        }
    };

    const generateMockOffices = (centerPos: [number, number]) => {
        // Generate mock points around the center
        const newOffices = MOCK_OFFICES.map((office, idx) => ({
            id: idx,
            name: office.name,
            position: [centerPos[0] + office.offset[0], centerPos[1] + office.offset[1]] as [number, number]
        }));
        setOffices(newOffices);
    };

    const onSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(search);
    };

    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1rem', background: 'white', borderBottom: '1px solid #e5e7eb', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <form onSubmit={onSearchSubmit} style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Search City, District or State..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: 'auto' }} disabled={loading}>
                        {loading ? 'Locating...' : 'Search'}
                    </button>
                </form>
            </div>

            <div style={{ flex: 1, position: 'relative' }}>
                <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
                    <ChangeView center={center} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={center}>
                        <Popup>
                            Target Location
                        </Popup>
                    </Marker>

                    {offices.map(office => (
                        <Marker key={office.id} position={office.position}>
                            <Popup>
                                <strong>{office.name}</strong><br />
                                Government Office<br />
                                <small>Open: 9 AM - 5 PM</small>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

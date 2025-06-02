export default function ViewModeDetails({ formData }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{formData.title}</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
              {formData.type}
            </span>
            <span className="text-gray-400">{formData.capacity} guests</span>
            <span className="text-gray-400">{formData.nombreOfChambres} bedrooms</span>
          </div>
        </div>
        <div className="text-2xl font-bold">
          {formData.pricePerNight}€ <span className="text-sm font-normal text-gray-400">/ night</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-secondary">Description</h3>
          <p className="whitespace-pre-line">{formData.description}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-secondary">Address</h3>
          <address className="not-italic">
            <p>{formData.address.street}</p>
            <p>{formData.address.city}, {formData.address.postalCode}</p>
            <p>{formData.address.country}</p>
          </address>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-secondary">Equipment</h3>
          <ul className="grid grid-cols-2 gap-2">
            {formData.equipement.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-secondary">Gallery</h3>
          <div className="grid grid-cols-3 gap-2">
            {formData.imagesBase64.map((image, index) => (
              <img
                key={index}
                src={`data:image/jpeg;base64,${image}`}
                alt={`Logement ${index + 1}`}
                className="h-24 w-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
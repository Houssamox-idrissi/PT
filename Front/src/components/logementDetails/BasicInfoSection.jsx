export default function BasicInfoSection({ formData, handleInputChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold border-b pb-2 border-secondary">Basic Information</h3>
      
      <div>
        <label className="block mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full bg-secondary border border-accent rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="w-full bg-secondary border border-accent rounded-lg px-4 py-2"
        >
          <option value="Maison">Maison</option>
          <option value="Appartement">Appartement</option>
          <option value="Villa">Villa</option>
          <option value="Studio">Studio</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows="4"
          className="w-full bg-secondary border border-accent rounded-lg px-4 py-2"
        />
      </div>
    </div>
  );
}
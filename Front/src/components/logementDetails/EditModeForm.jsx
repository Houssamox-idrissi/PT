import BasicInfoSection from "./BasicInfoSection";
import PricingCapacitySection from "./PricingCapacitySection";
import AddressSection from "./AddressSection";
import EquipmentSection from "./EquipmentSection";
import GallerySection from "./GallerySection";

export default function EditModeForm({
  formData,
  handleInputChange,
  handleAddressChange,
  newEquipment,
  setNewEquipment,
  handleAddEquipment,
  handleRemoveEquipment,
  handleRemoveImage
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BasicInfoSection 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
        
        <PricingCapacitySection 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
        
        <AddressSection 
          formData={formData} 
          handleAddressChange={handleAddressChange} 
        />
        
        <EquipmentSection 
          formData={formData}
          newEquipment={newEquipment}
          setNewEquipment={setNewEquipment}
          handleAddEquipment={handleAddEquipment}
          handleRemoveEquipment={handleRemoveEquipment}
        />
      </div>

      <GallerySection 
        images={formData.imagesBase64} 
        handleRemoveImage={handleRemoveImage} 
      />
    </form>
  );
}
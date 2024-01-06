export const openModal = (
  openMethod,
  modal,
  item,
  isNew = false,
  temp = {}
) => {
  if (openMethod === "new") {
    isNew = true;
    this.$refs[modal].openModal();

    temp = { imagesUrl: [] };
  } else if (openMethod === "edit") {
    isNew = false;
    temp = JSON.parse(JSON.stringify(item));

    this.$refs[modal].openModal();
  } else if (openMethod === "delete") {
    temp = JSON.parse(JSON.stringify(item));
    this.$refs.deleteProductModal.openModal();
  }
};

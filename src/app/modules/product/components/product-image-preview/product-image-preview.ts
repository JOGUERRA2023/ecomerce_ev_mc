import { Component, computed, input, signal } from "@angular/core"
import { NgOptimizedImage } from "@angular/common"
import { ProductImage } from "../../interfaces/productImage"

@Component({
  selector: "app-product-image-preview",
  imports: [NgOptimizedImage],
  templateUrl: "./product-image-preview.html",
  styleUrl: "./product-image-preview.css",
})
export class ProductImagePreview {
  productImages = input<ProductImage[]>([])
  selectedImageIndex = signal(0)
  featuredImageUrl = computed(() => {
    // return ""
    if (this.selectedImageIndex() == 0) {
      const productImages = this.productImages()
      const featuredImage = productImages.find((image) => image.featured)
      return featuredImage?.image ?? ""
    } else {
      const findedProductImage = this.productImages()[this.selectedImageIndex()]
      return findedProductImage?.image ?? ""
    }
  })

  selectImage(index: number) {
    this.selectedImageIndex.set(index)
  }

  getImageUrl(image: string) {
    return `https://maraviyainfotech.com/projects/carrot-tailwind/assets${image}`
  }
}

<template>
  <main>
    <CardElt v-if="checkSession('admin')">
      <template #header>
        <h1>{{ val.EDIT }} {{ product.name }}</h1>
        <h2>{{ product.cat }}</h2>
      </template>

      <template #body>
        <form enctype="multipart/form-data">
          <ListElt :items="val.PRODUCT_FORM">
            <template #item-1>
              <FieldElt
                id="name"
                v-model:value="product.name"
                @keyup.enter="updateProduct()"
                :info="val.INFO_NAME"
                :min="2"
              >
                <template #legend>{{ val.LEGEND_NAME }}</template>
                <template #label>{{ val.LABEL_NAME }}</template>
              </FieldElt>
            </template>

            <template #item-2>
              <label for="description">
                {{ val.LEGEND_DESCRIPTION }}
              </label>

              <Editor id="description" :api-key="val.TINY_KEY" v-model="product.description" :init="val.TINY_INIT" />
            </template>

            <template #item-3>
              <MediaElt v-if="product.image" :src="'/img/thumbnails/products/' + product.image" :alt="product.alt" />

              <FieldElt id="image" type="file" v-model:value="image" :info="val.INFO_IMAGE">
                <template #legend>{{ val.LEGEND_IMAGE }}</template>
                <template #label>{{ val.LABEL_IMAGE }}</template>
              </FieldElt>
            </template>

            <template #item-4>
              <FieldElt id="alt" type="textarea" v-model:value="product.alt" :info="val.INFO_ALT">
                <template #legend>{{ val.LEGEND_ALT }}</template>
                <template #label>{{ val.LABEL_ALT }}</template>
              </FieldElt>
            </template>

            <template #item-5>
              <FieldElt
                id="price"
                type="number"
                v-model:value="product.price"
                @keyup.enter="updateProduct()"
                :info="val.INFO_PRICE"
                :min="1"
                :max="1000"
              >
                <template #legend>{{ val.LEGEND_PRICE }}</template>
                <template #label>{{ val.LABEL_PRICE }}</template>
              </FieldElt>
            </template>

            <template #item-6>
              <FieldElt
                id="options"
                type="textarea"
                v-model:value="product.options"
                @keyup.enter="updateProduct()"
                :info="val.INFO_OPTIONS"
                :max="1000"
              >
                <template #legend>{{ val.LEGEND_OPTIONS }}</template>
                <template #label>{{ val.LABEL_OPTIONS }}</template>
              </FieldElt>
            </template>

            <template #item-7>
              <FieldElt
                id="cat"
                type="select"
                :list="val.CATS_PRODUCT"
                v-model:value="product.cat"
                @keyup.enter="updateProduct()"
                :info="val.INFO_CAT"
              >
                <template #legend>{{ val.LEGEND_CAT }}</template>
                <template #label>{{ val.LABEL_CAT }}</template>
              </FieldElt>
            </template>
          </ListElt>

          <BtnElt
            type="button"
            @click="updateProduct()"
            class="btn-sky"
            :content="val.CONTENT_UPDATE"
            :title="val.TITLE_UPDATE + product.name"
          >
            <template #btn>
              <i class="fa-solid fa-cloud-arrow-up fa-lg"></i>
            </template>
          </BtnElt>

          <BtnElt
            type="button"
            @click="deleteProduct()"
            class="btn-red"
            :content="val.TITLE_DELETE"
            :title="val.TITLE_DELETE + product.name"
          >
            <template #btn>
              <i class="fa-solid fa-cloud-arrow-up fa-lg"></i>
            </template>
          </BtnElt>
        </form>
      </template>
    </CardElt>

    <CardElt v-else itemscope itemtype="https://schema.org/Product">
      <template #header>
        <h1 itemprop="name">{{ product.name }}</h1>
        <h2 itemprop="category">{{ product.cat }}</h2>
      </template>

      <template #body>
        <MediaElt
          v-if="product.image"
          :src="`/img/products/${product.image}`"
          :alt="product.alt"
          :width="val.IMG_WIDTH"
          :height="val.IMG_HEIGHT"
          itemprop="image"
        />

        <section v-html="product.description" itemprop="description"></section>

        <p itemprop="offers" itemscope itemtype="https://schema.org/Offer">
          <b itemprop="price" class="monospace" :content="product.price + '.00'">
            {{ product.price }}
          </b>
          <i itemprop="priceCurrency" :content="val.CURRENCY_ISO">
            {{ val.CURRENCY_SYMBOL }}
          </i>
        </p>

        <form>
          <FieldElt
            id="basket-option"
            type="select"
            :list="product.options"
            v-model:value="option"
            @keyup.enter="addToBasket()"
            :info="val.INFO_OPTION"
          >
            <template #legend>{{ val.LEGEND_OPTION }}</template>
            <template #label>{{ val.LABEL_OPTION }}</template>
          </FieldElt>

          <FieldElt
            id="basket-quantity"
            type="number"
            v-model:value="quantity"
            @keyup.enter="addToBasket()"
            :info="val.INFO_QUANTITY"
            :min="1"
          >
            <template #legend>{{ val.LEGEND_QUANTITY }}</template>
            <template #label>{{ val.LABEL_QUANTITY }}</template>
          </FieldElt>

          <BtnElt
            type="button"
            @click="addToBasket()"
            class="btn-green"
            :content="val.CONTENT_ADD"
            :title="val.CONTENT_ADD + product.name"
          >
            <template #btn>
              <i class="fa-solid fa-basket-shopping fa-lg"></i>
            </template>
          </BtnElt>
        </form>
      </template>
    </CardElt>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { checkRange, checkRole, deleteData, getData, putData, setError, setMeta } from '../assets/services'

import BtnElt from '../components/BtnElt.vue'
import CardElt from '../components/CardElt.vue'
import FieldElt from '../components/FieldElt.vue'
import ListElt from '../components/ListElt.vue'
import MediaElt from '../components/MediaElt.vue'
import Editor from '@tinymce/tinymce-vue'

interface Basket {
  id: number
  option: string
  quantity: number
}

interface Order {
  id: number
  option: string
  quantity: number
}

interface Product {
  id: number
  name: string
  description: string
  image: string
  alt: string
  price: number
  options: any
  cat: string
}

interface Val {
  ALERT_DELETED: string
  ALERT_UPDATED: string
  API_URL: string
  CHECK_NUMBER: string
  CHECK_STRING: string
  HEAD: string
  PRICE_MAX: number
  PRICE_MIN: number
  TEXT_MIN: number
  TEXT_MAX: number
  TITLE_DELETE: string
  UI_URL: string
}

export default defineComponent({
  name: 'ProductView',
  components: { BtnElt, CardElt, FieldElt, ListElt, MediaElt, Editor },

  props: ['avatar', 'val'],
  data() {
    return {
      basket: [
        {
          id: 0,
          option: '',
          quantity: 0
        } as Basket
      ],
      isInBasket: false as boolean,
      option: '' as string,
      order: {
        id: 0,
        option: '',
        quantity: 0
      } as Order,
      product: {
        id: 0,
        name: '',
        description: '',
        image: '',
        alt: '',
        price: 0,
        options: '',
        cat: ''
      } as Product,
      quantity: 1 as number,
      token: '' as string
    }
  },

  /**
   * ? CREATED
   * * Retrieves the product from the API.
   * * Sets the meta tags.
   *
   * @return {Promise<void>} a promise that gets a "product"
   */
  async created(): Promise<void> {
    const { API_URL, HEAD, UI_URL }: Val = this.val

    try {
      const product: Product = await getData(`${API_URL}/products/${this.$route.params.id}`)
      product.options = product.options.split(',')
      this.product = product

      setMeta(
        product.name + HEAD,
        (product.description || '').slice(0, 160).replace(/(<([^>]+)>)/gi, ''),
        `${UI_URL}/product/${product.id}`,
        `${UI_URL}/img/thumbnails/products/${product.image}`
      )
    } catch (err) {
      setError(err)
      this.$router.push('/shop')
    }
  },

  /**
   * ? UPDATED
   * * Updating the description element if it exists.
   *
   * @returns void
   */
  updated(): void {
    if (document.getElementById('figcaption')) {
      const descriptionElt: HTMLElement | null = document.getElementById('figcaption')

      if (descriptionElt?.firstChild) {
        ;(descriptionElt.firstChild as HTMLElement).setAttribute('itemprop', 'description')
      }
    }
  },

  computed: {
    ...mapState(['token'])
  },

  methods: {
    /**
     * ? CHECK SESSION
     * * Checks the session for the specified role.
     *
     * @param {string} role - The role to check.
     * @return {boolean} The result of the session check.
     */
    checkSession(role: string): boolean {
      return checkRole(this.avatar.role, role)
    },

    /**
     * ? ADD TO BASKET
     * * Adds the selected item to the basket.
     */
    addToBasket(): void {
      if (this.option !== '') {
        this.createOrder()
        this.getBasket()
        this.checkBasket()
        this.setBasket()
      } else {
        alert(this.val.ALERT_OPTION)
      }
    },

    /**
     * ? CREATE ORDER
     * * Create an order based on the selected product, option & quantity.
     *
     * @returns {Order} - The created order
     */
    createOrder(): Order {
      return {
        id: Number(this.productId),
        option: this.option,
        quantity: this.quantity
      }
    },

    /**
     * Retrieves the basket from the local storage.
     * @returns {Basket[]} The basket retrieved from local storage.
     */
    getBasket(): Basket[] {
      let basketItem = localStorage.getItem('basket')

      if (basketItem === null) {
        localStorage.setItem('basket', JSON.stringify([]))
      }

      try {
        this.basket = JSON.parse(localStorage.getItem('basket')!) as Basket[]
      } catch (error) {
        console.error(`Error retrieving basket from local storage: ${error}`)
        localStorage.setItem('basket', JSON.stringify([]))
        this.basket = []
      }

      return this.basket
    },

    /**
     * ? CHECK BASKET
     * * Updates the basket quantity by checking if the order is already in it.
     *
     * @return {Object[]} The updated basket.
     */
    checkBasket(): void {
      this.isInBasket = false

      this.basket = this.basket.map((item: { id: number; option: string; quantity: number }) => {
        if (item.id === this.order.id && item.option === this.option) {
          item.quantity = Number(item.quantity) + Number(this.quantity)
          this.isInBasket = true
        }
        return item
      })
    },

    /**
     * ? SET BASKET
     * * Sets the basket by adding the order to the basket array & storing it in local storage.
     * @param {void}
     * @returns {void}
     */
    setBasket(): void {
      if (!this.isInBasket) this.basket.push(this.order)
      if (this.basket[0]) this.basket.shift()

      localStorage.setItem('basket', JSON.stringify(this.basket))
      alert(`${this.order.quantity} "${this.product.name}" (${this.order.option}) ${this.val.ALERT_BASKET_ADDED}`)
      this.$router.push('/shop')
    },

    /**
     * ? UPDATE PRODUCT
     * * Updates the product by sending a PUT request to the API.
     *
     * @returns {Promise<void>}
     */
    async updateProduct(): Promise<void> {
      const { ALERT_UPDATED, API_URL, CHECK_NUMBER, CHECK_STRING, PRICE_MIN, PRICE_MAX, TEXT_MIN, TEXT_MAX }: Val =
        this.val

      let { id, name, description, image, alt, price, options, cat }: Product = this.product

      const IS_NAME_CHECKED: boolean = checkRange(name, CHECK_STRING)
      const IS_DESC_CHECKED: boolean = checkRange(description, CHECK_STRING, TEXT_MIN, TEXT_MAX)
      const IS_ALT_CHECKED: boolean = checkRange(alt, CHECK_STRING)
      const IS_PRICE_CHECKED: boolean = checkRange(price, CHECK_NUMBER, PRICE_MIN, PRICE_MAX)

      if (IS_NAME_CHECKED && IS_DESC_CHECKED && IS_ALT_CHECKED && IS_PRICE_CHECKED) {
        const URL: string = `${API_URL}/products/${id}`

        const data: FormData = new FormData()
        const img: File | string = (document.getElementById('image') as HTMLInputElement)?.files?.[0] ?? image

        data.append('name', name)
        data.append('description', description)
        data.append('image', img)
        data.append('alt', alt)
        data.append('price', price.toString())
        data.append('options', options)
        data.append('cat', cat)

        try {
          await putData(URL, data, this.token)
          alert(name + ALERT_UPDATED)
        } catch (err) {
          setError(err)
        } finally {
          this.$router.push('/shop')
        }
      }
    },

    /**
     * ? DELETE PRODUCT
     * * Deletes a product from the system.
     */
    async deleteProduct(): Promise<void> {
      const { TITLE_DELETE, API_URL, ALERT_DELETED }: Val = this.val

      let { id, name }: Product = this.product

      if (confirm(`${TITLE_DELETE} ${name} ?`)) {
        const URL = `${API_URL}/products/${id}`

        try {
          await deleteData(URL, this.token)
          alert(name + ALERT_DELETED)
        } catch (err) {
          setError(err)
        } finally {
          this.$router.push('/shop')
        }
      }
    }
  }
})
</script>

<style>
[itemprop='price'] {
  font-size: 2.5rem;
}

.tox {
  margin: auto;
  max-width: 1000px;
}
</style>

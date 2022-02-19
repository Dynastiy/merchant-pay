<template>
  <div>
    <main class="container product__page">
      <!-- Left Column / Headphones Image -->
      <div class="left-column">
        <div class="product-description">
          <h1 class="text-capitalize">{{ submitted.name }}</h1>
          <p>
            {{ submitted.email }}
          </p>
          <p>
            {{ submitted.reference_number }}
          </p>
          <!-- <div>
            <span class="product__file__size">File Size:  {{ submitted.file_size }} </span>
            <div class="cable-choose">
                <button>Download File</button>
              </div>
          </div> -->
        </div>

        <!-- Product Configuration -->
        <div class="product-configuration">
          <!-- Product Color -->
          <div
            class="d-flex align-items-center"
            style="gap: 8px"
            v-if="submitted.is_verified === 'True'"
          >
            <div class="status__pointer bg-success rounded-circle"></div>
            <span class="small">Verified</span>
          </div>
          <div
            class="d-flex align-items-center"
            style="gap: 8px"
            v-else-if="submitted.is_verified === 'Pending'"
          >
            <div class="status__pointer bg-warning rounded-circle"></div>
            <span class="small">Pending</span>
          </div>
          <div class="d-flex align-items-center" style="gap: 8px" v-else>
            <div class="status__pointer bg-danger rounded-circle"></div>
            <span class="small">Not Verified</span>
          </div>

          <div class="product-price mt-4">
            <!-- <span v-if="product_details.license === 'paid' "> ${{ submitted.price }} </span>
          <span v-else>FREE</span> -->
            <a
              class="cart-btn btn-success"
              @click="approve(submitted)"
              v-show="submitted.is_verified === 'Pending'"
              >Verify</a
            >
            <a
              class="cart-btn btn-danger"
              @click="decline(submitted)"
              v-show="submitted.is_verified === 'Pending'"
              >Decline</a
            >
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- Product Description -->
        <section class="text-center">
          <div class="documents">
            <h3>Uploaded Documents</h3>
            <div class="listed_docs">
              <div
                class="listed"
                v-for="doc in documents"
                :key="doc.id"
                style="grid-gap: 10px"
              >
                <div class="shadow-sm p-3">
                  <img width="60%" :src="baseurl + doc.file" alt="" />
                  <h6>{{ doc.name }}</h6>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import helpers from "@/helpers/index.js";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      submitted: {},
      id: this.$route.params.id,
      baseurl: "https://api.verify.szcmerchant.com/",
      documents: [],
    };
  },
  methods: {
    async getKycByRef() {
      try {
        const res = await helpers.getKycByRef(this.id);
        console.log(res.kyc);
        this.submitted = res.kyc;
        this.documents = res.kyc.documents;
        console.log(this.documents);
      } catch (error) {
        console.log(error);
      }
    },
  async approve() {
    try {
      let payload = { code: "True", reference_number: this.id };
      await axios
        .post(`${this.baseurl}api/admin/kyc`, payload)
        .then((response) => {
          console.log(response);
          this.getKycByRef();
          let msg = response.data.message;
          Swal.fire("Done!", msg, "success");
        });
    } catch (error) {
      console.log(error);
    }
  },
  async decline() {
    try {
      let payload = { code: "False", reference_number: this.id };
      await axios
        .post(`${this.baseurl}api/admin/kyc`, payload)
        .then((response) => {
          console.log(response);
          this.getKycByRef();
          let msg = response.data.message;
          Swal.fire("Done!", msg, "error");
        });
    } catch (error) {
      console.log(error);
    }
  },
  },
  async created() {
    this.getKycByRef();
  },
};
</script>

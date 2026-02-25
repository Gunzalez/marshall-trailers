const { ref } = Vue;

export default {
  props: {},
  emits: ["download-pdf", "purchase-marshall", "email-enquiry"],

  setup(props, { emit }) {
    const additionalNotes = ref("");
    const title = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const phone = ref("");
    const address = ref("");
    const message = ref("");
    const emailError = ref(false);
    const phoneError = ref(false);
    const titleError = ref(false);
    const lastNameError = ref(false);
    const formDisplayState = ref(false);

    const updateAdditionalNotes = (event) => {
      additionalNotes.value = event.target.value;
    };

    const handleDownloadPDF = () => {
      emit("download-pdf", { additionalNotes: additionalNotes.value });
    };

    const handlePurchase = () => {
      emit("purchase-marshall", { additionalNotes: additionalNotes.value });
    };

    const toggleFormDisplay = () => {
      formDisplayState.value = !formDisplayState.value;
    };

    const handleEmailEnquiry = () => {
      let errorCount = 0;
      emailError.value = false;
      phoneError.value = false;
      titleError.value = false;
      lastNameError.value = false;

      if (!title.value) {
        errorCount++;
        titleError.value = true;
      }
      if (!lastName.value) {
        errorCount++;
        lastNameError.value = true;
      }
      if (!email.value) {
        errorCount++;
        emailError.value = true;
      }
      if (!phone.value) {
        errorCount++;
        phoneError.value = true;
      }

      if (errorCount > 0) {
        return;
      }

      emit("email-enquiry", {
        title: title.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        message: message.value,
        lastName: lastName.value,
        firstName: firstName.value,
        additionalNotes: additionalNotes.value,
      });
    };

    return {
      email,
      phone,
      title,
      message,
      address,
      firstName,
      lastName,
      emailError,
      phoneError,
      titleError,
      lastNameError,
      additionalNotes,
      formDisplayState,
      handlePurchase,
      toggleFormDisplay,
      handleDownloadPDF,
      handleEmailEnquiry,
      updateAdditionalNotes,
    };
  },
  template: `
    <div class="options-actions">
        <label for="additional-notes">
            <span>Provide additional notes or numbers to this specification</span>
            <textarea id="additional-notes" name="additional-notes" rows="5" cols="14" v-model="additionalNotes" @input="updateAdditionalNotes"></textarea>
        </label>

        <div class="configuration-actions">
            <div class="heading-wrapper">
                <div class="heading">
                    <div class="action-step">Step 04.</div>
                    <h2 class="title">Email, Download, or Order your Marshall</h2>
                </div>
            </div>

            <div class="buttons-and-form-fields">
                <div>
                    <h4>Choose one of the following options.</h4>
                    <div class="actions-buttons">
                        <button type="button" class="bttn" @click.prevent="handlePurchase">
                            <span>
                                <i class="fa-solid fa-cart-shopping"></i>
                            </span>
                            <span>Purchase your Marshall</span>
                        </button>
                        <button type="button" class="bttn" @click.prevent="handleDownloadPDF">
                            <span>
                                <i class="fa-solid fa-download"></i>
                            </span>
                            <span>Download quote as PDF</span>
                        </button>
                        <button type="button" class="bttn" @click.prevent="toggleFormDisplay">
                            <span>
                                <i class="fa-solid fa-paper-plane"></i>
                            </span>
                            <span>Email enquiry to Marshall</span>
                        </button>
                    </div>
                </div>
                <div v-if="formDisplayState" class="fieldset-width">
                    <div id="contact-section" class="contact-section">
                        <h4>Email enquiry to Marshall & a copy to yourself.</h4>
                        <div class="field-set">
                            <label for="title" class="short-label">
                                <span>Title *</span>
                                <div class="styled-select">
                                    <select id="title" name="title" v-model="title" :class="{ 'error': titleError }">
                                        <option value="Mr">Mr</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Ms">Ms</option>
                                        <option value="Miss">Miss</option>
                                        <option value="Dr">Dr</option>
                                        <option value="Prof">Prof</option>
                                        <option value="Rev">Rev</option>
                                        <option value="Sir">Sir</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <span v-if="titleError" class="error-message">Title is required</span>
                            </label>
                            <label for="first-name">
                                <span>First name</span>
                                <input type="text" name="first-name" id="first-name" v-model="firstName">
                            </label>
                            <label for="last-name">
                                <span>Last name *</span>
                                <input type="text" name="last-name" id="last-name" v-model="lastName" :class="{ 'error': lastNameError }">
                                <span v-if="lastNameError" class="error-message">Last name is required</span>
                            </label>
                            <label for="email">
                                <span>Email *</span>
                                <input type="email" name="email" id="email" v-model="email" :class="{ 'error': emailError }">
                                <span v-if="emailError" class="error-message">Email is required</span>
                            </label>
                            <label for="phone">
                                <span>Phone *</span>
                                <input type="tel" name="phone" id="phone" v-model="phone" :class="{ 'error': phoneError }">
                                <span v-if="phoneError" class="error-message">Phone is required</span>
                            </label>
                            <label for="address">
                                <span>Address</span>
                                <textarea id="address" name="address" rows="3" cols="14" v-model="address"></textarea>
                            </label>
                            <label for="message">
                                <span>Message</span>
                                <textarea id="message" name="message" rows="5" cols="14" v-model="message"></textarea>
                            </label>
                        </div>

                        <button type="button" class="bttn" @click.prevent="handleEmailEnquiry">
                            <span>
                                <i class="fa-solid fa-paper-plane"></i>
                            </span>
                            <span>Send email</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
};

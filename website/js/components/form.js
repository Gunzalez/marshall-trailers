const { ref } = Vue;

export default {
  props: {},
  emits: [""],

  setup(props, { emit }) {},
  template: `
    <div class="options-form">
        <form class="form options-notes">
            <label for="additional-notes">
                <span>Order notes or numbers</span>
                <textarea id="additional-notes"
                    name="additional-notes" 
                    rows="5" 
                    cols="14"></textarea>
            </label>
        </form>

        <div class="configuration-actions">
            <div class="heading-wrapper">
                <div class="heading">
                    <div class="action-step">Step 04.</div>
                    <h2 class="title">Save / Print / Order your machine</h2>
                </div>
            </div>
            <p>Choose one of the following options</p>
            <div class="actions-buttons">
                <button type="button" class="bttn">
                    <span>Purchase</span>
                    <span>your Marshall</span>
                </button>
                <button type="button" class="bttn">
                    <span>Email</span>
                    <span>Enquiry</span>
                </button>
                <button type="button" class="bttn">
                    <span>Save</span>
                    <span>as PDF</span>
                </button>
            </div>
        </div>
    </div>
    `,
};

<template>
  <CardElt id="project-set">
    <template #header>
      <h2>
        <i class="fa-solid fa-clipboard-check fa-lg"></i>
        {{ val.PROJECT_MANAGER }}
      </h2>
    </template>

    <template #body>
      <form enctype="multipart/form-data">
        <ListElt :items="val.PROJECT_FORM">

          <template #item-1>
            <FieldElt id="name"
              v-model:value="name" 
              @keyup.enter="createProject()"
              :info="val.INFO_NAME">
              <template #legend>{{ val.LEGEND_NAME }}</template>
              <template #label>{{ val.LABEL_NAME }}</template>
            </FieldElt>
          </template>

          <template #item-2>
            <FieldElt id="description"
              type="textarea"
              v-model:value="description"
              @keyup.enter="createProject()"
              :info="val.INFO_DESCRIPTION">
              <template #label>{{ val.LABEL_DESCRIPTION }}</template>
              <template #legend>{{ val.LEGEND_DESCRIPTION }}</template>
            </FieldElt>
          </template>

          <template #item-3>
            <FieldElt id="image" 
              type="file"
              v-model:value="image"
              :info="val.INFO_IMAGE">
              <template #legend>{{ val.LEGEND_IMAGE }}</template>
              <template #label>{{ val.LABEL_IMAGE }}</template>
            </FieldElt>
          </template>

          <template #item-4>
            <FieldElt id="alt"
              type="textarea"
              v-model:value="alt"
              @keyup.enter="createProject()"
              :info="val.INFO_ALT">
              <template #legend>{{ val.LEGEND_ALT }}</template>
              <template #label>{{ val.LABEL_ALT }}</template>
            </FieldElt>
          </template>

          <template #item-5>
              <FieldElt id="url"
                v-model:value="url"
                @keyup.enter="createProject()"
                :info="val.INFO_URL">
                <template #legend>{{ val.LEGEND_URL }}</template>
                <template #label>{{ val.LABEL_URL }}</template>
              </FieldElt>
            </template>

          <template #item-6>
            <FieldElt id="cat"
              type="select"
              :list="val.CATS_PROJECT"
              v-model:value="cat"
              @keyup.enter="createProject()"
              :info="val.INFO_CAT">
              <template #legend>{{ val.LEGEND_CAT }}</template>
              <template #label>{{ val.LABEL_CAT }}</template>
            </FieldElt>
          </template>
        </ListElt>
        <br>

        <BtnElt type="button"
          @click="createProject()" 
          class="btn-green"
          :content="val.CONTENT_CREATE"
          :title="val.TITLE_PROJECT">
          <template #btn>
            <i class="fa-solid fa-square-plus fa-lg"></i>
          </template>
        </BtnElt>
      </form>

      <form v-if="projects.length > 0">
        <TableElt :items="projects">
          <template #cell-id="slotProps">
            <BtnElt :content="slotProps.item.id"
              :href="`https://${slotProps.item.url}`"/>
          </template>

          <template #cell-name="slotProps">
            <FieldElt :id="`name-${slotProps.item.id}`"
              v-model:value="slotProps.item.name"
              @keyup.enter="updateProject(slotProps.item.id)"
              :info="val.INFO_UP_NAME">
              <template #legend>{{ val.LEGEND_NAME }}</template>
              <template #label>{{ val.LABEL_NAME }}</template>
            </FieldElt>
          </template>

          <template #cell-description="slotProps">
            <FieldElt :id="`description-${slotProps.item.id}`"
              type="textarea"
              v-model:value="slotProps.item.description"
              @keyup.enter="updateProject(slotProps.item.id)"
              :info="val.INFO_UP_NAME">
              <template #legend>{{ val.LEGEND_DESCRIPTION }}</template>
              <template #label>{{ val.LABEL_DESCRIPTION }}</template>
            </FieldElt>
          </template>

          <template #cell-image="slotProps">
            <MediaElt :src="'/img/thumbnails/projects/' + slotProps.item.image"
              :alt="slotProps.item.alt"
              :title="slotProps.item.image"
              loading="lazy"/>

            <FieldElt :id="`image-${slotProps.item.id}`"
              type="file"
              :info="val.INFO_UP_IMAGE">
              <template #legend>{{ val.LEGEND_IMAGE }}</template>
              <template #label>{{ val.LABEL_IMAGE }}</template>
            </FieldElt>
          </template>

          <template #cell-alt="slotProps">
            <FieldElt :id="`alt-${slotProps.item.id}`"
              type="textarea"
              v-model:value="slotProps.item.alt"
              @keyup.enter="updateProject(slotProps.item.id)"
              :info="val.INFO_ALT">
              <template #legend>{{ val.LEGEND_ALT }}</template>
              <template #label>{{ val.LABEL_ALT }}</template>
            </FieldElt>
          </template>

          <template #cell-url="slotProps">
            <FieldElt :id="`url-${slotProps.item.id}`"
              type="url"
              v-model:value="slotProps.item.url"
              @keyup.enter="updateProject(slotProps.item.id)"
              :info="val.INFO_UP_URL"
              :label="val.INFO_UP_URL"
              :max="parseInt('250')">
              <template #legend>{{ val.LEGEND_URL }}</template>
              <template #label>{{ val.LABEL_URL }}</template>
            </FieldElt>
          </template>

          <template #cell-cat="slotProps">
            <FieldElt :id="`cat-${slotProps.item.id}`"
              type="select"
              :list="val.CATS_PROJECT"
              v-model:value="slotProps.item.cat"
              @keyup.enter="updateProject(slotProps.item.id)"
              :info="val.INFO_UP_CAT"
              :label="val.INFO_UP_CAT">
              <template #legend>{{ val.LEGEND_CAT }}</template>
              <template #label>{{ val.LABEL_CAT }}</template>
            </FieldElt>
          </template>

          <template #cell-createdAt="slotProps">
            <p>{{ new Date(slotProps.item.createdAt).toLocaleString() }}</p>

            <BtnElt type="button"
              @click="deleteProject(slotProps.item.id)" 
              class="btn-red"
              :title="val.TITLE_DELETE + slotProps.item.name">
              <template #btn>
                <i class="fa-solid fa-trash-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>
          </template>

          <template #cell-updatedAt="slotProps">
            <p>{{ new Date(slotProps.item.updatedAt).toLocaleString() }}</p>

            <BtnElt type="button"
              @click="updateProject(slotProps.item.id)" 
              class="btn-sky"
              :title="val.TITLE_UPDATE + slotProps.item.name">
              <template #btn>
                <i class="fa-solid fa-cloud-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>
          </template>
        </TableElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import BtnElt from "@/components/elements/BtnElt"
import CardElt from "@/components/elements/CardElt"
import FieldElt from "@/components/elements/FieldElt"
import ListElt from "@/components/elements/ListElt"
import MediaElt from "@/components/elements/MediaElt"
import TableElt from "@/components/elements/TableElt"

import { checkRange, checkRegex } from "@/services/checkers"
import { deleteData, postData, putData } from "@/services/fetchers"
import { getItemName } from "@/services/getters"
import { setError } from "@/services/setters"

export default {
  name: "ProjectSet",
  components: { BtnElt, CardElt, FieldElt, ListElt, MediaElt, TableElt },
  props: ["projects", "token", "val"],
  data() {
    return {
      name: "",
      description:"",
      image: "",
      alt: "",
      url: "",
      cat: ""
    }
  },

  methods: {
    /**
     * ? CREATE PROJECT
     * * Creates an project by sending a POST request to the server with the provided data.
     */
    createProject() {
      const { ALERT_CREATED, ALERT_IMG, API_URL, CAT_PROJECT, CHECK_STRING, CHECK_URL, REGEX_URL, TEXT_MIN, TEXT_MAX } = this.val;

      if (this.url.startsWith("http")) this.url = this.url.split('//')[1];
      if (this.cat === "") this.cat = CAT_PROJECT;

      const IS_NAME_CHECKED = checkRange(this.name, CHECK_STRING);
      const IS_DESC_CHECKED = checkRange(this.description, CHECK_STRING, TEXT_MIN, TEXT_MAX);
      const IS_ALT_CHECKED  = checkRange(this.alt, CHECK_STRING);

      const IS_URL_CHECKED = this.url ? checkRegex(this.url, CHECK_URL, REGEX_URL) : true;

      if (IS_NAME_CHECKED && IS_DESC_CHECKED && IS_ALT_CHECKED && IS_URL_CHECKED) {
        const img = document.getElementById("image")?.files[0];

        if (img !== undefined) {
          const URL   = `${API_URL}/projects`;
          const data  = new FormData();

          data.append("name", this.name);
          data.append("description", this.description);
          data.append("image", img);
          data.append("alt", this.alt);
          data.append("url", this.url);
          data.append("cat", this.cat);

          postData(URL, data, this.token)
            .then(() => {
              alert(this.name + ALERT_CREATED);
              this.$router.go();
            })
            .catch(err => setError(err));

        } else {
          alert(ALERT_IMG);
        }
      }
    },

    /**
     * ? UPDATE PROJECT
     * * Updates the project with the provided data.
     * @param {type} id - The ID of the project to update.
     */
    updateProject(id) {
      const { API_URL, ALERT_UPDATED, CHECK_STRING, REGEX_URL, TEXT_MAX, TEXT_MIN } = this.val;
      const project = this.projects.find(p => p.id === id);
      let { name, description, image, alt, url, cat } = project;

      const IS_NAME_CHECKED = checkRange(name, CHECK_STRING);
      const IS_DESC_CHECKED = checkRange(description, CHECK_STRING, TEXT_MIN, TEXT_MAX);
      const IS_ALT_CHECKED  = checkRange(alt, CHECK_STRING);
      const IS_URL_CHECKED  = url ? checkRegex(url, CHECK_STRING, REGEX_URL) : true;

      if (IS_NAME_CHECKED && IS_DESC_CHECKED && IS_ALT_CHECKED && IS_URL_CHECKED) {
        const URL   = `${API_URL}/projects/${id}`;
        const data  = new FormData();
        const img   = document.getElementById(`image-${id}`)?.files[0] ?? image;

        data.append("name", name);
        data.append("description", description);
        data.append("image", img);
        data.append("alt", alt);
        data.append("url", url);
        data.append("cat", cat);

        putData(URL, data, this.token)
          .then(() => {
            alert(name + ALERT_UPDATED);
            this.$router.go();
          })
          .catch(err => setError(err));
      }
    },

    /**
     * ? DELETE PROJECT
     * * Deletes an project with the given ID.
     * @param {type} id - The ID of the project to delete.
     */
    deleteProject(id) {
      const { TITLE_DELETE, API_URL, ALERT_DELETED } = this.val;
      const NAME = getItemName(id, this.projects);

      if (confirm(`${TITLE_DELETE} ${NAME} ?`)) {
        const URL = `${API_URL}/projects/${id}`

        deleteData(URL, this.token)
          .then(() => {
            alert(NAME + ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => setError(err));
      }
    }
  }
}
</script>

<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-text v-if="!user"> Go to login please </v-card-text>

        <v-card-text v-if="user">
          Hello {{ user.pseudo }}
          <v-list>
            <v-list-group
              v-for="drawer in drawers"
              :key="drawer.uuid"
              prepend-icon="mdi-locker-multiple"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="drawer.label"></v-list-item-title>
                  <v-list-item-subtitle>
                    {{ drawer.description }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>

              <v-list-item v-for="link in drawer.links" :key="link.uuid">
                <v-list-item-content>
                  <v-list-item-title v-text="link.title"></v-list-item-title>
                  <v-list-item-subtitle>
                    {{ link.description }}
                  </v-list-item-subtitle>
                  <a :href="link.url">{{ link.url }}</a>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>

          <v-btn class="ma-2" color="primary" @click="addDrawer()">
            Drawer
            <v-icon right> mdi-plus-circle </v-icon>
          </v-btn>
          <v-btn class="ma-2" color="primary" @click="addLink()">
            Link
            <v-icon right> mdi-plus-circle </v-icon>
          </v-btn>
        </v-card-text>
      </v-card>

      <v-card v-if="showDrawerForm" class="mt-5">
        <v-card-text>
          <v-form ref="drawerForm">
            <v-text-field
              v-model="dLabel"
              label="Label"
              outlined
              required
            ></v-text-field>
            <v-text-field
              v-model="dDescription"
              label="Description"
              outlined
            ></v-text-field>
            <v-btn color="success" class="mr-4" @click="addDrawerForm">
              Add Drawer
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>

      <v-card v-if="showLinkForm" class="mt-5">
        <v-card-text>
          <v-form ref="linkForm">
            <v-text-field
              v-model="lUrl"
              label="URL"
              outlined
              required
            ></v-text-field>
            <v-text-field
              v-model="lTitle"
              label="Title"
              outlined
              required
            ></v-text-field>
            <v-select
              :items="drawers"
              item-text="label"
              return-object
              v-model="lDrawer"
              label="Drawer"
              outlined
            ></v-select>
            <v-text-field
              v-model="lDescription"
              label="Description"
              outlined
            ></v-text-field>
            <v-btn color="success" class="mr-4" @click="addLinkForm">
              Add Link
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// TODO refactor in component
export default {
  name: "IndexPage",

  created() {
    if (this.user?.token) {
      this.getDrawers();
    }
  },

  data: () => ({
    drawers: [],
    showDrawerForm: false,
    showLinkForm: false,

    dLabel: "",
    dDescription: "",

    lUrl: "",
    lTitle: "",
    lDescription: "",
    lDrawer: null,
  }),

  methods: {
    addDrawer() {
      this.showDrawerForm = true;
      this.showLinkForm = false;
    },

    addDrawerForm() {
      this.$axios
        .$post(
          "drawers",
          {
            label: this.dLabel,
            description: this.dDescription,
          },
          { headers: { user_token: this.user.token } }
        )
        .then((res) => {
          this.dLabel = "";
          this.dDescription = "";
          this.getDrawers();
        });
    },

    addLink() {
      this.showLinkForm = true;
      this.showDrawerForm = false;
    },

    addLinkForm() {
      this.$axios
        .$post(
          "links",
          {
            url: this.lUrl,
            title: this.lTitle,
            drawerUuid: this.lDrawer.uuid,
            description: this.lDescription,
          },
          { headers: { user_token: this.user.token } }
        )
        .then((res) => {
          this.lUrl = "";
          this.lTitle = "";
          this.lDrawer = null;
          this.lDescription = "";
          this.getDrawers();
        });
    },

    getDrawers() {
      this.$axios
        .get("drawers", { headers: { user_token: this.user.token } })
        .then((res) => {
          this.drawers = res.data;
        });
    },
  },

  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
};
</script>
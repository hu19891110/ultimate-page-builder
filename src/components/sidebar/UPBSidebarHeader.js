import store from "../../store";

export default {
    name  : 'upb-sidebar-header',
    props : ['index', 'model'],

    data(){
        return {
            l10n : store.l10n
        }
    },

    methods : {

        removeActive(){
            this.model.map((item) => {
                item.active = false
            });
        },

        save(){
            if (store.isDirty()) {

                this.$progressbar.show();
                store.saveState(() => {
                    store.stateSaved();
                    // store.reloadPreview();
                    this.$progressbar.hide();
                    this.$toast.success(this.l10n.saved);
                }, () => {
                    this.$progressbar.hide();
                    this.$toast.error(this.l10n.savingProblem);
                });
            }
        },

        isDirty(){
            return store.isDirty();
        }
    },

    components : {
        'upb-sidebar-header-item' : () => import(/* webpackChunkName: "upb-sidebar-header-item" */ './UPBSidebarHeaderItem.vue')
    }
}
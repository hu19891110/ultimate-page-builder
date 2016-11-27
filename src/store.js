import extend from 'extend';

class store {

    constructor() {
        this.tabs   = window._upb_tabs;
        this.status = window._upb_status;
        this.router = window._upb_router || [];

        this.l10n          = window._upb_l10n;
        this.router_config = window._upb_router_config;
        this.breadcrumb    = [];
        this.devices       = window._upb_preview_devices;
        this.grid          = window._upb_grid_system;
        this.preview       = 'upb-preview-frame';
    }

    reloadPreview() {
        window.frames[this.preview].contentWindow.location.reload();
    }

    getTabs() {
        return this.tabs;
    }

    getStatus() {
        return this.status;
    }

    isDirty() {
        return this.status.dirty;
    }

    changeStatus() {
        this.status.dirty = !this.status.dirty
    }

    stateChanged() {
        this.status.dirty = true
    }

    stateSaved() {
        this.status.dirty = false
    }

    cleanup(contents) {
        return contents.map((content) => {
            delete content['_upb_settings'];
            delete content['_upb_options'];
            delete content['_upb_field_attrs'];
            delete content['_upb_field_type'];

            if (content['contents']) {
                this.cleanup(content['contents']);
            }
            return content;
        });
    }

    saveState(success, error) {

        const state = {};

        this.tabs.map((data) => {
            let newdata       = extend(true, {}, data);
            state[data['id']] = this.cleanup(newdata.contents);
        });

        console.log(state);

        wp.ajax.send("_upb_save", {
            success : success,
            error   : error,
            data    : {
                _nonce : this.status._nonce,
                id     : this.status._id,
                states : state
            }
        });
    }

    getPanelContents(panel_hook, success, error) {

        wp.ajax.send(panel_hook, {
            success : success,
            error   : error,
            data    : {
                _nonce : this.status._nonce,
                id     : this.status._id
            }
        });
    }

    upbElementOptions(contents, success, error) {
        wp.ajax.send("_get_upb_element_options", {
            success : success,
            error   : error,
            data    : {
                _nonce   : this.status._nonce,
                contents : contents
            }
        });
    }
}

export default new store();
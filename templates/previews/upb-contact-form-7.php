<?php defined( 'ABSPATH' ) or die( 'Keep Silent' ); ?>

<div v-show="isEnabled" :id="addID()" :class="addClass()" v-ui-draggable v-preview-element :style="backgroundVariables">

    <upb-preview-mini-toolbar :contents="false" :parent="parent" :model="model"></upb-preview-mini-toolbar>

    <div v-if="!model.attributes.id" v-text="model._upb_options.meta.messages.chooseForm"></div>

    <div v-else v-html="ajaxContents"></div>
</div>
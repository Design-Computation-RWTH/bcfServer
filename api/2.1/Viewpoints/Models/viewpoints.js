const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Have a look at: https://zellwk.com/blog/mongoose-subdocuments/ @OlliSchu


const componentSchema = new Schema({
    ifc_guid: {
        type: String
    },
    originating_system: {
        type: String
    },
    authoring_tool_id: {
        type: String
    }
});

const directionSchema = new Schema({
    x: {
        type: Number
    },
    y: {
        type: Number
    },
    z: {
        type: Number
    }
});

const pointSchema = new Schema({
    x: {
        type: Number
    },
    y: {
        type: Number
    },
    z: {
        type: Number
    }
});

const locationSchema = new Schema({
    x: {
        type: Number
    },
    y: {
        type: Number
    },
    z: {
        type: Number
    }
});

const orthogonal_cameraSchema = new Schema({
    camera_view_point: pointSchema,
    camera_direction: directionSchema,
    camera_up_vector: directionSchema,
    view_to_world_scale: {
        type: Number,
    },
});

const perspective_cameraSchema = new Schema({
    camera_view_point: pointSchema,
    camera_direction: directionSchema,
    camera_up_vector: directionSchema,
    field_of_view: {
        type: Number,
    }

});

const lineSchema = new Schema({
    start_point: pointSchema,
    end_point: pointSchema
});

const clipping_planeSchema = new Schema({
    location: locationSchema,
    direction: directionSchema
});

const bitmapSchema = new Schema({
    guid: {
        type: String,
        required: true
    },
    bitmap_type: {
        type: String,
        enum: ["jpg", "png"]
    },
    bitmap_data: {
        type: String,
        format: "base64"
    },
    location: locationSchema,

    normal: directionSchema,

    up: directionSchema,

    height: {
        type: Number
    }
});

const snapshotSchema = new Schema({
    snapshot_type: {
        type: String,
        enum: ["jpg", "png"]
    },
    snapshot_data: {
        type: String,
        format: "base64"
    }
});

const component_listSchema = new Schema({
    type: Array,
        items: {
            type: componentSchema
        }
});

const view_setup_hintsSchema = new Schema({
    spaces_visible: {
        type: Boolean,
        default: false
    },
    space_boundaries_visible: {
        type: Boolean,
        default: false
    },
    openings_visible: {
        type: Boolean,
        default: false
    }
})

const visibilitySchema = new Schema({
    default_visibility: {
        type: Boolean,
        default: false
    },
    exceptions: component_listSchema,

    view_setup_hints: view_setup_hintsSchema

})

const coloringSchema = new Schema({
    color: {
        type: String,
    },
    components: component_listSchema
})

const componentsSchema = new Schema({
    selection: component_listSchema,

    coloring: coloringSchema,

    visibility: visibilitySchema

})



const viewpointsSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    index: {
        type: Number
    },
    guid: { 
        type: String,
        required: true
         },
    orthogonal_camera: orthogonal_cameraSchema,

    perspective_camera: perspective_cameraSchema,

    lines: [ lineSchema ],

    clipping_planes: [clipping_planeSchema],

    bitmaps: [ bitmapSchema ],

    snapshot: snapshotSchema,

    components: componentsSchema

});

module.exports = viewpointsSchema;
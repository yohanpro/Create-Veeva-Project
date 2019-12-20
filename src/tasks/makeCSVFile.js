import shell from 'shelljs';
import fs from 'fs';
import {
    DIRECTORIES
} from '../main';
import path from 'path'
import {
    createObjectCsvWriter as createCsvWriter
} from 'csv-writer';

let optionsInstance = null;
export const makeCSVFile = (options) => {
    optionsInstance = options;
    const csvWriter = createCsvWriter({
        path: `${optionsInstance.targetDirectory}/vault.csv`,
        header: [{
                id: "pres.crm_presentation_id__v",
                title: "pres.crm_presentation_id__v"
            },
            {
                id: "external_id__v",
                title: "external_id__v"
            },
            {
                id: "name__v",
                title: "name__v"
            },
            {
                id: "Create Presentation",
                title: "Create Presentation"
            },
            {
                id: "Type",
                title: "Type"
            },
            {
                id: "lifecycle__v",
                title: "lifecycle__v"
            },
            {
                id: "Presentation Link",
                title: "Presentation Link"
            },
            {
                id: "Fields Only",
                title: "Fields Only"
            },
            {
                id: "pres.crm_training__v",
                title: "pres.crm_training__v"
            },
            {
                id: "pres.crm_hidden__v",
                title: "pres.crm_hidden__v"
            },
            {
                id: "pres.product__v.name__v",
                title: "pres.product__v.name__v"
            },
            {
                id: "slide.crm_media_type__v",
                title: "slide.crm_media_type__v"
            },
            {
                id: "slide.crm_disable_actions__v",
                title: "slide.crm_disable_actions__v"
            },
            {
                id: "slide.product__v.name__v",
                title: "slide.product__v.name__v"
            },
            {
                id: "slide.filename",
                title: "slide.filename"
            },
            {
                id: "slide.crm_shared_resource__v",
                title: "slide.crm_shared_resource__v"
            },
            {
                id: "slide.clm_content__v",
                title: "slide.clm_content__v"
            },
            {
                id: "pres.clm_content__v",
                title: "pres.clm_content__v"
            },
            {
                id: "slide.related_shared_resource__v",
                title: "slide.related_shared_resource__v"
            },
            {
                id: "pres.engage_content__v",
                title: "pres.engage_content__v"
            },
            {
                id: "slide.engage_content__v",
                title: "slide.engage_content__v"
            },
            {
                id: "pres.cobrowse_content__v",
                title: "pres.cobrowse_content__v"
            }
        ]
    })
    // shell.cd(options.targetDirectory);
    csvWriter
        .writeRecords(records()) // returns a promise
        .then(() => {
            console.log("...Done");
        });

}


const records = () => {
    let arr = null;
    if (optionsInstance.seperate) {
        arr = [{
                "pres.crm_presentation_id__v": `${optionsInstance.presentation}_ADD`,
                external_id__v: `${optionsInstance.presentation}_ADD`,
                name__v: `${optionsInstance.presentation}`,
                Type: "Presentation",
                lifecycle__v: "Binder Lifecycle",
                "pres.crm_training__v": "FALSE",
                "pres.crm_hidden__v": "TRUE",
                "pres.product__v.name__v": `${optionsInstance.product}`,
                "pres.clm_content__v": "YES",
                "pres.engage_content__v": "No",
                "pres.cobrowse_content__v": "No"
            },
            {
                "pres.crm_presentation_id__v": `${optionsInstance.presentation}_MAIN`,
                external_id__v: `${optionsInstance.presentation}_MAIN`,
                name__v: `${optionsInstance.presentation}`,
                Type: "Presentation",
                lifecycle__v: "Binder Lifecycle",
                "pres.crm_training__v": "FALSE",
                "pres.crm_hidden__v": "FALSE",
                "pres.product__v.name__v": `${optionsInstance.product}`,
                "pres.clm_content__v": "YES",
                "pres.engage_content__v": "No",
                "pres.cobrowse_content__v": "No"
            },
            {
                external_id__v: `${optionsInstance.presentation}_Shared`,
                name__v: `${optionsInstance.presentation}_Shared`,
                "Create Presentation": "FALSE",
                Type: "Shared",
                lifecycle__v: "CRM Content Lifecycle",
                "Fields Only": "FALSE",
                "slide.crm_media_type__v": "HTML",
                "slide.crm_disable_actions__v": "Zoom, Swipe",
                "slide.product__v.name__v": `${optionsInstance.product}`,
                "slide.filename": `${optionsInstance.presentation}_Shared.zip`,
                "slide.crm_shared_resource__v": "YES",
                "slide.clm_content__v": "YES",
                "slide.engage_content__v": "No"
            },
            {
                name__v: `${optionsInstance.presentation}_PI`,
                "Create Presentation": "FALSE",
                Type: "Slide",
                lifecycle__v: "CRM Content Lifecycle",
                "Presentation Link": `${optionsInstance.presentation}_ADD`,
                "Fields Only": "FALSE",
                "slide.crm_media_type__v": "HTML",
                "slide.crm_disable_actions__v": "Zoom, Swipe",
                "slide.product__v.name__v": `${optionsInstance.product}`,
                "slide.filename": `${optionsInstance.presentation}_PI.zip`,
                "slide.clm_content__v": "YES",
                "slide.related_shared_resource__v": `${optionsInstance.presentation}_Shared`,
                "slide.engage_content__v": "No"
            },
            {
                name__v: `${optionsInstance.presentation}_REFS`,
                "Create Presentation": "FALSE",
                Type: "Slide",
                lifecycle__v: "CRM Content Lifecycle",
                "Presentation Link": `${optionsInstance.presentation}_ADD`,
                "Fields Only": "FALSE",
                "slide.crm_media_type__v": "HTML",
                "slide.crm_disable_actions__v": "Zoom, Swipe",
                "slide.product__v.name__v": `${optionsInstance.product}`,
                "slide.filename": `${optionsInstance.presentation}_REFS.zip`,
                "slide.clm_content__v": "YES",
                "slide.related_shared_resource__v": `${optionsInstance.presentation}_Shared`,
                "slide.engage_content__v": "No"
            }
        ];
    } else {
        arr = [{
                "pres.crm_presentation_id__v": `${optionsInstance.presentation}`,
                external_id__v: `${optionsInstance.presentation}`,
                name__v: `${optionsInstance.presentation}`,
                Type: "Presentation",
                lifecycle__v: "Binder Lifecycle",
                "pres.crm_training__v": "FALSE",
                "pres.crm_hidden__v": "FALSE",
                "pres.product__v.name__v": `${optionsInstance.product}`,
                "pres.clm_content__v": "YES",
                "pres.engage_content__v": "No",
                "pres.cobrowse_content__v": "No"
            },
            {
                external_id__v: `${optionsInstance.presentation}_Shared`,
                name__v: `${optionsInstance.presentation}_Shared`,
                "Create Presentation": "FALSE",
                Type: "Shared",
                lifecycle__v: "CRM Content Lifecycle",
                "Fields Only": "FALSE",
                "slide.crm_media_type__v": "HTML",
                "slide.crm_disable_actions__v": "Zoom, Swipe",
                "slide.product__v.name__v": `${optionsInstance.product}`,
                "slide.filename": `${optionsInstance.presentation}_Shared.zip`,
                "slide.crm_shared_resource__v": "YES",
                "slide.clm_content__v": "YES",
                "slide.engage_content__v": "No"
            }
        ];
    }

    makeNormalSlideCSV(arr);
    if (!optionsInstance.seperate) {
        arr.push({
            name__v: `${optionsInstance.presentation}_PI`,
            "Create Presentation": "FALSE",
            Type: "Slide",
            lifecycle__v: "CRM Content Lifecycle",
            "Presentation Link": `${optionsInstance.presentation}`,
            "Fields Only": "FALSE",
            "slide.crm_media_type__v": "HTML",
            "slide.crm_disable_actions__v": "Zoom, Swipe",
            "slide.product__v.name__v": `${optionsInstance.product}`,
            "slide.filename": `${optionsInstance.presentation}_PI.zip`,
            "slide.clm_content__v": "YES",
            "slide.related_shared_resource__v": `${optionsInstance.presentation}_Shared`,
            "slide.engage_content__v": "No"
        }, {
            name__v: `${optionsInstance.presentation}_REFS`,
            "Create Presentation": "FALSE",
            Type: "Slide",
            lifecycle__v: "CRM Content Lifecycle",
            "Presentation Link": `${optionsInstance.presentation}`,
            "Fields Only": "FALSE",
            "slide.crm_media_type__v": "HTML",
            "slide.crm_disable_actions__v": "Zoom, Swipe",
            "slide.product__v.name__v": `${optionsInstance.product}`,
            "slide.filename": `${optionsInstance.presentation}_REFS.zip`,
            "slide.clm_content__v": "YES",
            "slide.related_shared_resource__v": `${optionsInstance.presentation}_Shared`,
            "slide.engage_content__v": "No"
        });
    }
    return arr;
};
const makeNormalSlideCSV = arr => {
    for (let i = 0; i < optionsInstance.slide; i++) {
        let slide = null;
        let name = "";
        if (i < 10) {
            name = "00" + i;
        } else if (i >= 10) {
            name = "0" + i;
        }
        slide = {
            name__v: `${optionsInstance.presentation}_${name}`,
            "Create Presentation": "FALSE",
            Type: "Slide",
            lifecycle__v: "CRM Content Lifecycle",
            "Presentation Link": `${
          optionsInstance.seperate === true ? `${optionsInstance.presentation}_MAIN` : `${optionsInstance.presentation}`
        }`,
            "Fields Only": "FALSE",
            "slide.crm_media_type__v": "HTML",
            "slide.crm_disable_actions__v": "Zoom, Swipe",
            "slide.product__v.name__v": `${optionsInstance.product}`,
            "slide.filename": `${optionsInstance.presentation}_${name}.zip`,
            "slide.clm_content__v": "YES",
            "slide.related_shared_resource__v": `${optionsInstance.presentation}_Shared`,
            "slide.engage_content__v": "No"
        };
        arr.push(slide);
    }
    return arr;
};
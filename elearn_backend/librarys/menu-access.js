let programMenu = require("../config/program-menu.json");
let programAccess = require("../config/program-access.json");

let getProgram = (userRole, pageId = undefined) => {

    let programMenuJson = JSON.parse(JSON.stringify(programMenu));

    const roleAcess = Object.entries(programAccess).find(([key, value]) => key == userRole);

    if (roleAcess && typeof roleAcess[1] === "string") { // admin role

        programMenuJson.map((menuObj, menuIdx) => { // have access all program

            menuObj.access = true; // menu access true
            
            if (menuObj.submenu && menuObj.submenu.length > 0) {

                menuObj.submenu.map((subMenuObj, subMenuIdx) => {
                    subMenuObj.access = true // submenu access true
                    subMenuObj.actions = subMenuObj.actions.split(",");
                });
            }
        });

        return { program: programMenuJson, page: getPageData(programMenuJson, pageId) };
    }
    else if (roleAcess && typeof roleAcess[1] === "object") { // supervisor or basic role

        programMenuJson.map((menuObj, subMenuIdx) => { // have access some program
            if (roleAcess[1].menu.includes(menuObj.menuid)) {
                menuObj.access = true; // menu access true
            }

            // if (subMenuIdx == 0) {
            //     roleAcess[1].submenu.map((accessSubMenu, accessSubIdx) => roleAcess[1].submenu[accessSubIdx] = accessSubMenu.split(','));
            // }

            if (menuObj.submenu && menuObj.submenu.length > 0) {

                menuObj.submenu.map((subMenuObj, subMenuIdx) => {

                    const subMenuAccess = roleAcess[1].submenu.find((subMenuAccessStr, subMenuAccessIdx) => subMenuAccessStr.includes(subMenuObj.menuid) == true);

                    if (subMenuAccess) {
                        subMenuObj.access = true; // submenu access true
                        subMenuObj.actions = subMenuAccess.split(",").slice(1);
                    }
                });
            }
        });

        return { program: programMenuJson, page: getPageData(programMenuJson, pageId) };
    }
    else {
        return;
    }
};

let getPageData = (getProgramMenu, getPageId) => {

    if (getPageId !== undefined) {
        getPageId = getPageId.split(".");
        const pageObj = Object.entries(getProgramMenu).reduce((pageObj, [key, value]) => {
            if (value.menuid == getPageId[0]) { // check Menu
                // pageObj = value.submenu.find((subMenuObj) => subMenuObj.menuid == getPageId[1])[getPageId[2]];
                pageObj = value.submenu.find((subMenuObj) => subMenuObj.menuid == getPageId[1]);
            }
            return pageObj;
        }, {});

        return pageObj;
    }
    return;   
}

module.exports = {
    getProgram: getProgram
};
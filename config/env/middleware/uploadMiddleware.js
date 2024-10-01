"use-strict";
const { setCreatorFields } = require("@strapi/utils");

const setPathIdAndPath = async (folder) => {
  const { max } = await strapi.db
    .queryBuilder("plugin::upload.folder")
    .max("pathId")
    .first()
    .execute();

  const pathId = max + 1;
  let parentPath = "/";
  if (folder.parent) {
    const parentFolder = await strapi.entityService.findOne(
      "plugin::upload.folder",
      folder.parent
    );
    parentPath = parentFolder.path;
  }

  return Object.assign(folder, {
    pathId,
    path: `${parentPath}/${pathId}`,
  });
};

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Only run this middleware for the upload endpoint
    if (ctx.url === "/upload" && ctx.method === "POST") {
      if (ctx.request.body) {
        try {
          let folderName;
          const rootFolder = process.env.CLOUDINARY_FOLDER;

          // get upload plugin configuration
          const config = strapi.config.get("plugin.upload");

          // get file extension
          const fileInfo = JSON.parse(ctx?.request?.body?.fileInfo);
          const extension = fileInfo.name.split(".").pop().toLowerCase();

          // config folder option to save in cloudinary
          if (
            extension === "jpg" ||
            extension === "jpeg" ||
            extension === "png"
          ) {
            folderName = "Images";
            config.actionOptions.uploadStream.folder = `${rootFolder}/${folderName}`;
          } else if (extension === "pdf") {
            folderName = "PDFs";
            config.actionOptions.uploadStream.folder = `${rootFolder}/${folderName}`;
          } else {
            folderName = "Others";
            config.actionOptions.uploadStream.folder = `${rootFolder}/${folderName}`;
          }

          // get folders in media library
          const folders = await strapi.entityService.findMany(
            "plugin::upload.folder"
          );

          // find folder from folders in media library
          let folder = folders.find((folder) => folder.name === folderName);

          // create folder to save in admin panel if not exist
          if (!folder) {
            const folderData = { name: folderName, parent: null };
            const user = ctx.state.user;
            let enrichedFolder = await setPathIdAndPath(folderData);
            if (user) {
              enrichedFolder = await setCreatorFields({ user })(enrichedFolder);
            }
            folder = await strapi.entityService.create(
              "plugin::upload.folder",
              { data: enrichedFolder }
            );
          }

          // set folder option in request to save in admin panel
          fileInfo.folder = folder.id;
          ctx.request.body.fileInfo = JSON.stringify(fileInfo);
        } catch (error) {
          console.error(
            "Error parsing or modifying fileInfo or Configurations:",
            error
          );
        }
      }
    }

    // Continue to the next middleware
    await next();
  };
};

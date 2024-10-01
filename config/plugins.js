module.exports = ({ env }) => ({
  //...
  "import-export-entries": {
    enabled: true,
    config: {
      // See `Config` section.
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {
          resource_type: (file) => {
            // Check the file extension and set the resource_type accordingly
            if (file.ext === ".pdf") {
              return "raw"; // Treat PDFs as raw files
            }
            return "auto"; // Use the default behavior for other file types
          },
        },
        uploadStream: {},
        delete: {},
      },
    },
  },
  //...
});

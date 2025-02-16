## Getting Started

This project uses Dev Container, see [Dev Containers tutorial](https://code.visualstudio.com/docs/devcontainers/tutorial) for more information. However, if this isn't an option for you, then you can setup the development environment manually using the `scripts/setupLocalDevEnv.sh`[^shscript] file.

To run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

During development, the database is stored in the folder called `local`. If this is corrupted during development, simply delete the folder and run `scripts/setupLocalDevEnv.sh` again.

[^shscript]: The `.sh` scripts doesn't work on Microsoft Windows, but you can follow along manually (or write an alternative script in PowerShell).

## Remaining Works

- [ ] Add favicon
- [ ] Setup CAPTCHA
- [ ] Update DaisyUI out of beta (currently using v5-beta7)

## Maintainance

### Keep In Minds

- Use `<Link>` from `@/i18n/routing` rather than `next/link` for the translations to work.

### Code Styles

This project uses Prettier to enforce code styles. You can find the Prettier extension on VSCode. If code is not properly styled, then the **build process will fail**.

### Content Changes

- To change the texts and translations, see `messages` folder. 
  - The "Not Found" page, which is in `src/app/not-found.tsx` file, doesn't use `messages` because it has to handle the case where the requested language is unsupported. 
  - Some texts related to the registration/order system, such as order status messages, are stored in the database instead of the `messages` folderr.
  - Reminder: The English and Thai version of various images should be the same width and height. The width and height is found in the code, so if you updated the images, you should also update the image's width and height in the code as well. 
- To change the theme colors, see `src/app/globals.css` file. The [theme generator](https://v5.daisyui.com/theme-generator/) may also be useful.
- To change the font, see `src/app/layout.tsx` file. Changing between [Google Fonts](https://fonts.google.com) is a simple process, but using fonts not on Google Fonts maybe require more work.
- To change page layout, see the `page.tsx` files in `src/app`. 
- While some options are configurable via Admin UI, others must be done through by changing `src/config.ts` file.
- If you want certain parts of the page to be updatable without changing the codes (e.g., live donation amount), the function `getRuntimeConfig` maybe helpful. To add more entries into this function, you can simply add to the `ToggleConfigs` or `FreeformConfigs` in `src/app/admin/main/Settings.tsx`.
- Passwords are stored in Argon2id hash. To change the password, the easiest way is to go to Admin UI > Security > Change Password. If you are locked out, you will need to edit the database and update the password hash manually.

## Deployment

To build the image:
```bash
docker build -t mdcu-anandaydonation .
```

To run:
```bash
docker run -p 3000:3000 -v "/path/to/your/storage/here/:/data/" mdcu-anandaydonation
```
Remember to put the `/data/` directory in a persistent volume, otherwise the database will be wiped! Also, you should reset the JWT Key through the Admin UI to prevent unauthorize access.

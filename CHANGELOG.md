# Changelog

## 0.19.0 (2026-02-07)

Full Changelog: [v0.18.0...v0.19.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.18.0...v0.19.0)

### Features

* **api:** add Credentials endpoint ([3c4d4ed](https://github.com/ArkHQ-io/ark-nodejs/commit/3c4d4eda2b98b2d2ad5bc61e6c513f87551b20e5))
* **api:** add Platform webhooks ([8875eea](https://github.com/ArkHQ-io/ark-nodejs/commit/8875eea8a0c58351dce385921011d56e8ded0898))
* **api:** endpoint updates ([c67a1c5](https://github.com/ArkHQ-io/ark-nodejs/commit/c67a1c5857a6707071e9d468c4981362e7f1b435))
* **api:** standardization improvements ([087adb7](https://github.com/ArkHQ-io/ark-nodejs/commit/087adb7559d5e36dd5fea346ba6770997d82864f))
* **api:** tenant usage ([de82564](https://github.com/ArkHQ-io/ark-nodejs/commit/de82564e838b31e984121785eec473b821824e35))
* **mcp:** add initial server instructions ([7c219ef](https://github.com/ArkHQ-io/ark-nodejs/commit/7c219ef9152d8a60a45e8101e665e8b430edbb38))


### Bug Fixes

* **client:** avoid removing abort listener too early ([baf7f06](https://github.com/ArkHQ-io/ark-nodejs/commit/baf7f06addf76c618407874e0c39c33f97fd8a43))


### Chores

* **client:** restructure abort controller binding ([c5b7f61](https://github.com/ArkHQ-io/ark-nodejs/commit/c5b7f6128f1bca05d6f8fc078665e385e45ae618))
* **internal:** add health check to MCP server when running in HTTP mode ([c636579](https://github.com/ArkHQ-io/ark-nodejs/commit/c636579c23562a4c6d64fbb3a61f0931d1682def))
* **internal:** fix pagination internals not accepting option promises ([62f477b](https://github.com/ArkHQ-io/ark-nodejs/commit/62f477b0133ec81cf20a5b5763bbc505f9060187))
* **internal:** refactor flag parsing for MCP servers and add debug flag ([49c53e8](https://github.com/ArkHQ-io/ark-nodejs/commit/49c53e8c80b538ad6d233a082702fdda5ee7b237))
* **internal:** upgrade pnpm ([b1cd8ca](https://github.com/ArkHQ-io/ark-nodejs/commit/b1cd8cabf3d025e6a7d1190448fb6352026756cf))

## 0.18.0 (2026-02-03)

Full Changelog: [v0.17.0...v0.18.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.17.0...v0.18.0)

### Features

* **api:** Add Tenants ([3da61b1](https://github.com/ArkHQ-io/ark-nodejs/commit/3da61b1cfa489b1f00db2c83f269566967043ac8))
* **api:** api update ([afbabc0](https://github.com/ArkHQ-io/ark-nodejs/commit/afbabc0806983ccd8f63e16ba4839f98c5ab9118))
* **api:** manual updates ([8825395](https://github.com/ArkHQ-io/ark-nodejs/commit/88253951d1d34643a86b40b547bbeae6b25533d0))
* **api:** manual updates ([775842c](https://github.com/ArkHQ-io/ark-nodejs/commit/775842c4701afeca828156cb83938ee531b24f4b))
* **api:** manual updates ([36ae874](https://github.com/ArkHQ-io/ark-nodejs/commit/36ae874419c22de822cbb0a4ba0085ae37479111))


### Bug Fixes

* **client:** avoid memory leak with abort signals ([60ac85e](https://github.com/ArkHQ-io/ark-nodejs/commit/60ac85e51287bb44347fc1905b93bfb842cf6891))


### Chores

* **client:** do not parse responses with empty content-length ([4e06830](https://github.com/ArkHQ-io/ark-nodejs/commit/4e068306b0aab7177f3f8b8c360ce9d8dce01fe1))
* **internal:** support oauth authorization code flow for MCP servers ([d397739](https://github.com/ArkHQ-io/ark-nodejs/commit/d3977396bad9ea396ba0079287d2cd0383c235c1))

## 0.17.0 (2026-01-30)

Full Changelog: [v0.16.0...v0.17.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.16.0...v0.17.0)

### Features

* **api:** api update ([c31439a](https://github.com/ArkHQ-io/ark-nodejs/commit/c31439a713ae8810a6935b76076f625c0ae95c8a))
* **api:** manual updates ([8d77b4b](https://github.com/ArkHQ-io/ark-nodejs/commit/8d77b4bbc3bd2d8d79ade21aa7dda59c3e1e251b))

## 0.16.0 (2026-01-30)

Full Changelog: [v0.15.0...v0.16.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.15.0...v0.16.0)

### Features

* **api:** api update ([64e38a0](https://github.com/ArkHQ-io/ark-nodejs/commit/64e38a022bbdc89c32166d9caaac3f22fd505d22))
* **api:** api update ([f4de7b3](https://github.com/ArkHQ-io/ark-nodejs/commit/f4de7b333b463faac5e6d64e01b607b6c3d3613a))
* **api:** manual updates ([7bb8ad0](https://github.com/ArkHQ-io/ark-nodejs/commit/7bb8ad06c7030ee9510b4e10394dc1af6197ce45))
* **api:** manual updates ([f693fce](https://github.com/ArkHQ-io/ark-nodejs/commit/f693fceba49fa8b425ba2b200856dbaee20f19fc))
* **api:** manual updates ([94a42ef](https://github.com/ArkHQ-io/ark-nodejs/commit/94a42efd1005d63f47412a7db54429761e760967))

## 0.15.0 (2026-01-29)

Full Changelog: [v0.14.0...v0.15.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.14.0...v0.15.0)

### Features

* **api:** add usage and SendLimit Headers ([4da45ed](https://github.com/ArkHQ-io/ark-nodejs/commit/4da45ed0e1a9631991bc4590736d0faa652e76c5))
* **api:** api update ([99d6f72](https://github.com/ArkHQ-io/ark-nodejs/commit/99d6f720ac84fec7749a3c3b704f083f8b38f9d6))
* **api:** domain list improvement ([f923eb4](https://github.com/ArkHQ-io/ark-nodejs/commit/f923eb4873d76b90c5141f6a42ad4f672e8a9eb1))


### Bug Fixes

* **docs:** fix mcp installation instructions for remote servers ([fba93be](https://github.com/ArkHQ-io/ark-nodejs/commit/fba93bed40ee7e2927d35441960b671321437128))
* **mcp:** allow falling back for required env variables ([6a4afe9](https://github.com/ArkHQ-io/ark-nodejs/commit/6a4afe9dcee95c51a64dab727a8c5e8f52dc292b))


### Chores

* **internal:** codegen related update ([6bc6e19](https://github.com/ArkHQ-io/ark-nodejs/commit/6bc6e190404d671c69af638b853e04cec5098965))
* **mcp:** up tsconfig lib version to es2022 ([659edb2](https://github.com/ArkHQ-io/ark-nodejs/commit/659edb25f192b964c95a91489ef9b4e9c2d1ac84))

## 0.14.0 (2026-01-25)

Full Changelog: [v0.13.0...v0.14.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.13.0...v0.14.0)

### Features

* **api:** manual updates ([8c3c143](https://github.com/ArkHQ-io/ark-nodejs/commit/8c3c1439bf23574d4c60b0fe36ac7ad65c53b112))
* **api:** update email details to include attachments ([5694d32](https://github.com/ArkHQ-io/ark-nodejs/commit/5694d32305945e20ea42e6d4d48c1e390c7e8518))


### Chores

* **ci:** upgrade `actions/github-script` ([121d128](https://github.com/ArkHQ-io/ark-nodejs/commit/121d1287418f72e2d6a148428fb73f98db1d0b4b))

## 0.13.0 (2026-01-23)

Full Changelog: [v0.12.0...v0.13.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.12.0...v0.13.0)

### Features

* **api:** fix from in Send raw MIME email ([c839a48](https://github.com/ArkHQ-io/ark-nodejs/commit/c839a4843060616e3573fb4931f9a2f9c9c9a269))
* **api:** improve raw MIME error handling ([c859430](https://github.com/ArkHQ-io/ark-nodejs/commit/c859430e4a04aefc66e4e8b64d4b0fee61499cd8))

## 0.12.0 (2026-01-23)

Full Changelog: [v0.11.0...v0.12.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.11.0...v0.12.0)

### Features

* **api:** improve raw endpoint ([e1a5e58](https://github.com/ArkHQ-io/ark-nodejs/commit/e1a5e58177c7a84a0d67b7515fb934a530932c70))

## 0.11.0 (2026-01-22)

Full Changelog: [v0.10.0...v0.11.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.10.0...v0.11.0)

### Features

* **api:** api update ([942ac0c](https://github.com/ArkHQ-io/ark-nodejs/commit/942ac0c134761a2406fdf871a4a89137251f284c))
* **api:** api update ([e8b7d3e](https://github.com/ArkHQ-io/ark-nodejs/commit/e8b7d3e42697d35c9fa517248a437886e0d97898))
* **api:** fix incorrect webhook payload examples ([060b86a](https://github.com/ArkHQ-io/ark-nodejs/commit/060b86a38f7c5660717578af867ab78e20123e50))
* **api:** manual updates ([e816eb2](https://github.com/ArkHQ-io/ark-nodejs/commit/e816eb29acf534c27986d83a2bfbe35981285078))

## 0.10.0 (2026-01-22)

Full Changelog: [v0.9.0...v0.10.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.9.0...v0.10.0)

### Features

* **api:** improve GET delivery attempts ([e8307a5](https://github.com/ArkHQ-io/ark-nodejs/commit/e8307a540da03a58c6ade2ca444a4f2dcf265b8d))

## 0.9.0 (2026-01-21)

Full Changelog: [v0.8.0...v0.9.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.8.0...v0.9.0)

### Features

* **api:** add sandbox domain ([71ae6bf](https://github.com/ArkHQ-io/ark-nodejs/commit/71ae6bfc4dea99c0af32fd010bdec1c21d73c0d1))

## 0.8.0 (2026-01-20)

Full Changelog: [v0.7.0...v0.8.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.7.0...v0.8.0)

### Features

* **api:** add webhook deliveries ([ffda43d](https://github.com/ArkHQ-io/ark-nodejs/commit/ffda43d5983d16f059cf796e01a6f247bd2e5792))
* **api:** api update ([2ba0809](https://github.com/ArkHQ-io/ark-nodejs/commit/2ba0809880889563637014f1d800df353e01e1d0))
* **api:** api update ([1dd887d](https://github.com/ArkHQ-io/ark-nodejs/commit/1dd887d545f326131e3ed896ae8a91e839b592df))
* **api:** manual updates ([cb41988](https://github.com/ArkHQ-io/ark-nodejs/commit/cb41988e77659b79af4e9f47481608e34ddde0e4))


### Bug Fixes

* **client:** invalid URL ([f083cbd](https://github.com/ArkHQ-io/ark-nodejs/commit/f083cbdeaf76340b0a5a6b7ccb89c5f77cd843a3))


### Chores

* bump debug version ([4d63010](https://github.com/ArkHQ-io/ark-nodejs/commit/4d6301016c1c13b1ac9bf854a508c137ff6c3b47))
* **internal:** codegen related update ([026f6b9](https://github.com/ArkHQ-io/ark-nodejs/commit/026f6b97f23b702b20a9606d5f468b375004ee18))
* **internal:** codegen related update ([48b3349](https://github.com/ArkHQ-io/ark-nodejs/commit/48b33490f7c4a8d07bbb766ad863b8668d2df378))
* **internal:** update `actions/checkout` version ([35c6299](https://github.com/ArkHQ-io/ark-nodejs/commit/35c6299cc5162e23d2e94ab8b95eabae481957a6))
* **internal:** update lock file ([e2d2f0d](https://github.com/ArkHQ-io/ark-nodejs/commit/e2d2f0d4a16bd6c72c0fd3ddabe5b57e93ea7e70))
* **internal:** upgrade babel, qs, js-yaml ([fd3460d](https://github.com/ArkHQ-io/ark-nodejs/commit/fd3460d41713812fd73c799c8f0767840534fe93))
* **internal:** upgrade brace-expansion and @babel/helpers ([0dcd33b](https://github.com/ArkHQ-io/ark-nodejs/commit/0dcd33b28db4b8602cca7107cd4587564af2c8ed))
* **mcp:** add intent param to execute tool ([0b1e383](https://github.com/ArkHQ-io/ark-nodejs/commit/0b1e383d5d820da98279106a703f1efa4ed65dcf))
* **mcp:** pass intent param to execute handler ([4ac583a](https://github.com/ArkHQ-io/ark-nodejs/commit/4ac583a545d726055a54c3d51ac288d7daa180e5))
* **mcp:** upgrade dependencies ([2f8ec87](https://github.com/ArkHQ-io/ark-nodejs/commit/2f8ec8718aec2149f1a58aec4e06729b24a00c57))

## 0.7.0 (2026-01-14)

Full Changelog: [v0.6.0...v0.7.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.6.0...v0.7.0)

### Features

* **api:** add metadata ([2679698](https://github.com/ArkHQ-io/ark-nodejs/commit/267969876f1b16776c73f5ef6eaba6bd72dd495c))


### Chores

* fix typo in descriptions ([da4ac06](https://github.com/ArkHQ-io/ark-nodejs/commit/da4ac068ee876cd5bcc7e70d8e9f094be7101ed1))

## 0.6.0 (2026-01-13)

Full Changelog: [v0.5.2...v0.6.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.5.2...v0.6.0)

### Features

* **api:** manual updates ([77e0ac1](https://github.com/ArkHQ-io/ark-nodejs/commit/77e0ac1defad9e4c653968aec7ade015c6575c97))
* **api:** manual updates ([13d672c](https://github.com/ArkHQ-io/ark-nodejs/commit/13d672ce47018a85148d7ce9b925d55693d0a392))

## 0.5.2 (2026-01-13)

Full Changelog: [v0.5.1...v0.5.2](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.5.1...v0.5.2)

### Chores

* configure new SDK language ([1a24644](https://github.com/ArkHQ-io/ark-nodejs/commit/1a24644f17178f407704468c1d22f19714fcb2e0))
* **internal:** configure MCP Server hosting ([8f70ff5](https://github.com/ArkHQ-io/ark-nodejs/commit/8f70ff5d5e4824fb2de1c1b0e8c77eee9bfcb351))

## 0.5.1 (2026-01-13)

Full Changelog: [v0.5.0...v0.5.1](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.5.0...v0.5.1)

### Chores

* update SDK settings ([a5d86ab](https://github.com/ArkHQ-io/ark-nodejs/commit/a5d86abfe5d5986bab54ed2660cb6f35cd45d567))

## 0.5.0 (2026-01-13)

Full Changelog: [v0.4.0...v0.5.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.4.0...v0.5.0)

### Features

* **api:** manual updates ([f813adb](https://github.com/ArkHQ-io/ark-nodejs/commit/f813adba10e338fd54a968992f0cacae3abdf3d5))

## 0.4.0 (2026-01-13)

Full Changelog: [v0.3.0...v0.4.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.3.0...v0.4.0)

### Features

* **api:** api update ([0eaf1fe](https://github.com/ArkHQ-io/ark-nodejs/commit/0eaf1fe064d9168018f3700351549708cd7de25b))
* **api:** api update ([f3411f5](https://github.com/ArkHQ-io/ark-nodejs/commit/f3411f5dd165b0957ac7675d5075f7413f33ac48))
* **api:** manual updates ([b1746f4](https://github.com/ArkHQ-io/ark-nodejs/commit/b1746f4400f581b85fd49592284f7e17f020f0d5))
* **api:** manual updates ([92bf8d9](https://github.com/ArkHQ-io/ark-nodejs/commit/92bf8d9a68333a0e4e1d893e0fb25df6b8503046))
* **api:** manual updates ([f626b56](https://github.com/ArkHQ-io/ark-nodejs/commit/f626b5653f59d445cf0267f9f0f9f64fbbee97e9))
* **api:** manual updates ([b33acbb](https://github.com/ArkHQ-io/ark-nodejs/commit/b33acbb523c5dc3fdd2ff65447d4de308aba3de0))
* **api:** manual updates ([a37bb97](https://github.com/ArkHQ-io/ark-nodejs/commit/a37bb971d00dc5fd0410de9b8ad7314494c5df70))
* **api:** manual updates ([cf863b5](https://github.com/ArkHQ-io/ark-nodejs/commit/cf863b5d87fb97347ed2736ff01e98c959b24804))
* **api:** manual updates ([8103e47](https://github.com/ArkHQ-io/ark-nodejs/commit/8103e47e939042924ed97cae887e0f47a60e1955))
* **api:** manual updates ([a7b064d](https://github.com/ArkHQ-io/ark-nodejs/commit/a7b064ddc25aaec798a1ce6355adf393253a0115))
* **api:** manual updates ([091fa7c](https://github.com/ArkHQ-io/ark-nodejs/commit/091fa7cb74cfa78fb3e0a639eba6e3965c2868fb))

## 0.3.0 (2026-01-12)

Full Changelog: [v0.2.0...v0.3.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.2.0...v0.3.0)

### Features

* **api:** api update ([9190541](https://github.com/ArkHQ-io/ark-nodejs/commit/919054126761cfb8f719b3cd6b77e34f825e10ed))

## 0.2.0 (2026-01-12)

Full Changelog: [v0.1.0...v0.2.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.1.0...v0.2.0)

### Features

* **api:** api update ([9190541](https://github.com/ArkHQ-io/ark-nodejs/commit/919054126761cfb8f719b3cd6b77e34f825e10ed))

## 0.1.0 (2026-01-12)

Full Changelog: [v0.0.2...v0.1.0](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.0.2...v0.1.0)

### Features

* **api:** api update ([14a50c5](https://github.com/ArkHQ-io/ark-nodejs/commit/14a50c59a1555c18ca7e5d2b4abe732788121c3b))
* **api:** api update ([71e703e](https://github.com/ArkHQ-io/ark-nodejs/commit/71e703eead20289f14838410780476bd203701f2))

## 0.0.2 (2026-01-12)

Full Changelog: [v0.0.1...v0.0.2](https://github.com/ArkHQ-io/ark-nodejs/compare/v0.0.1...v0.0.2)

### Chores

* configure new SDK language ([6ecd0f9](https://github.com/ArkHQ-io/ark-nodejs/commit/6ecd0f9532e9cfeb09f05e832a300a67c6ab3a6b))
* update SDK settings ([ab591d5](https://github.com/ArkHQ-io/ark-nodejs/commit/ab591d53f1a7767e711bc95384948d4007eb380e))
* update SDK settings ([300608c](https://github.com/ArkHQ-io/ark-nodejs/commit/300608c6e95d8aa8582dd24d623b8a57afda3e33))

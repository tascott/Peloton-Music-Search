interface Instructor {
    id: string;
    name: string;
    image_url: string;
    type?: 'other' | 'single';
}

export const instructors: Record<string, Instructor> = {
    '017dd08b095346979ddf761eb49f9f67': {
        id: '017dd08b095346979ddf761eb49f9f67',
        name: 'Erik Jäger',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/002b5f9e149c4b08a4b17f8980d700ef'
    },
    '01f636dc54a145239c4348e1736684ee': {
        id: '01f636dc54a145239c4348e1736684ee',
        name: 'Bradley Rose',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/f67c2881a24947e8b4a3264bf8d3d613'
    },
    '048f0ce00edb4427b2dced6cbeb107fd': {
        id: '048f0ce00edb4427b2dced6cbeb107fd',
        name: 'Jess King',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/e52c67e891b3428d97687123556a00e4'
    },
    '05735e106f0747d2a112d32678be8afd': {
        id: '05735e106f0747d2a112d32678be8afd',
        name: 'Olivia Amato',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/11a3c05c0dc04722a0277a353d045d43'
    },
    '096de802dbb1428b95aae223b7364799': {
        id: '096de802dbb1428b95aae223b7364799',
        name: 'Jess & Robin',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/9fb1cd6881f84436b86227c85aa1b103'
    },
    '09ca61e720824073b26c36677fb15b0e': {
        id: '09ca61e720824073b26c36677fb15b0e',
        name: 'Ben & Leanne',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/0629a5c915724fcfa6a4b4fb660e4c6d'
    },
    '0ac29effd55a435bad2f5c07cab8e567': {
        id: '0ac29effd55a435bad2f5c07cab8e567',
        name: 'Charlotte Weidenbach',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/4924ff8fc38c4719a5dee2f36d7ad6cc'
    },
    '0d41a81a64bc4e38866bc01a0918020f': {
        id: '0d41a81a64bc4e38866bc01a0918020f',
        name: 'Cody & Emma',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/44f6c2fce0754756a67891f692978f8b'
    },
    '0e836f86aa9c488782452243f2e17170': {
        id: '0e836f86aa9c488782452243f2e17170',
        name: 'Mayla Wedekind',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/eb12312cfa4241f0a9f8835acd4bc117'
    },
    '0ebae5c509634ab0b46e1249f75cf37f': {
        id: '0ebae5c509634ab0b46e1249f75cf37f',
        name: 'Alex & Tunde',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/e4f5bdd25e044749880a0715c847c061'
    },
    '1b79e462bd564b6ca5ec728f1a5c2af0': {
        id: '1b79e462bd564b6ca5ec728f1a5c2af0',
        name: 'Jess Sims',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/24e566a5c480484e84738d15cf56bf56'
    },
    '1e59e949a19341539214a4a13ea7ff01': {
        id: '1e59e949a19341539214a4a13ea7ff01',
        name: 'Denis Morton',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/03859b15aba040e784e0cb087d74c4cc'
    },
    '2532a869b9304a279becaf39c9aae182': {
        id: '2532a869b9304a279becaf39c9aae182',
        name: 'Multiple Instructors',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/d1323e5dd4c94c65baaf7584f8d9f574'
    },
    '2e1dd0aeae654d208cd8ea0f6145440c': {
        id: '2e1dd0aeae654d208cd8ea0f6145440c',
        name: 'Ally & Emma',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/2553a581582a4233b1d7db80ca13ba66'
    },
    '2e57092bee334c8c8dcb9fe16ba5308c': {
        id: '2e57092bee334c8c8dcb9fe16ba5308c',
        name: 'Alex Toussaint',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/e6b311cca77747e19ef878eba2bd75a9'
    },
    '304389e2bfe44830854e071bffc137c9': {
        id: '304389e2bfe44830854e071bffc137c9',
        name: 'Matt Wilpers',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/ea402a80791c4c53beb404d32d58ad38'
    },
    '313df4bf5c2f4a08ad555613d1ebd324': {
        id: '313df4bf5c2f4a08ad555613d1ebd324',
        name: 'Camila & Cody',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/c8ae517bac384967b46be0ecc4649215'
    },
    '35016225e39d46dbbc364991ab48e10f': {
        id: '35016225e39d46dbbc364991ab48e10f',
        name: 'Christian Vande Velde',
        image_url: 'https://workout-metric-images-prod.s3.amazonaws.com/e92a4616ae3f4ee3837a710facd34369'
    },
    '3afdc3ead3734ce1889d25804052d853': {
        id: '3afdc3ead3734ce1889d25804052d853',
        name: 'Multiple Instructors',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/f963e7e3c1c045d4b10aee42407c037d'
    },
    '3ff679ebbd324c83a8ab6cfa6bb4be37': {
        id: '3ff679ebbd324c83a8ab6cfa6bb4be37',
        name: 'Hannah Frankson',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/a7da6a1ec9be4008bee14cb7da8f67a9'
    },
    '4039531b0cbf4fd49e9dae48fb96b667': {
        id: '4039531b0cbf4fd49e9dae48fb96b667',
        name: 'Multiple Instructors',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/38bb5a20d3364a318dc2aa4bcbdc5397'
    },
    '4672db841da0495caf4b8f9cda405512': {
        id: '4672db841da0495caf4b8f9cda405512',
        name: 'Sam Yo',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/94112d749a07405aa1e17ad17fde616e'
    },
    '4904612965164231a37143805a387e40': {
        id: '4904612965164231a37143805a387e40',
        name: 'Kendall Toole',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/665ceefafeb04a38ac56914a4e568699'
    },
    '51702da3a4684b988d31d89eebb43175': {
        id: '51702da3a4684b988d31d89eebb43175',
        name: 'Jenn Sherman',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/3c2ef38e930e453ea08de3367699f0b5'
    },
    '55da0d66d75d4e52b06bf6376f6731b6': {
        id: '55da0d66d75d4e52b06bf6376f6731b6',
        name: 'Alex & Jenn',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/0778ec40abfb4cc0a707dbe5f00e7f17'
    },
    '561f95c405734d8488ed8dcc8980d599': {
        id: '561f95c405734d8488ed8dcc8980d599',
        name: 'Hannah Corbin',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/7ead5f8f5e74484d8496a3982a063302'
    },
    '580261f1ac95448bbfd208bbaaa8b9ad': {
        id: '580261f1ac95448bbfd208bbaaa8b9ad',
        name: 'Cycling Instructors 2019',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/980b38bc970247028a8c1d64fb4076f5'
    },
    '5a19bfe66e644a2fa3e6387a91ebc5ce': {
        id: '5a19bfe66e644a2fa3e6387a91ebc5ce',
        name: "Christine D'Ercole",
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/dd9fb14fad3d4d0d9e12884b6a55bae7'
    },
    '5c784412fb234b2b833dda585d518642': {
        id: '5c784412fb234b2b833dda585d518642',
        name: 'Denis & Matt',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/381fd66e635343d3b7be1774a8c59d0b'
    },
    '696bd08dd5284accab065e2147b121d7': {
        id: '696bd08dd5284accab065e2147b121d7',
        name: 'Camila Ramón',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/9cdb882b2532494b973672b625ed0aa4'
    },
    '731d7b7f6b414a49892c21f01e25317d': {
        id: '731d7b7f6b414a49892c21f01e25317d',
        name: 'Ally Love',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/ba43805e1ff34472870cb6a439a56078'
    },
    '7d8b0bf272734f548d90af0bd8cd20cd': {
        id: '7d8b0bf272734f548d90af0bd8cd20cd',
        name: 'Cliff & Hannah',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/65fd8a39376749488db8a5cb614b919a'
    },
    '7f3de5e78bb44d8591a0f77f760478c3': {
        id: '7f3de5e78bb44d8591a0f77f760478c3',
        name: 'Ben Alldis',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/1d00ad7b40554729b514cb1ee47903b6'
    },
    '8386bbbbc4bd42d798262feaf9b109fc': {
        id: '8386bbbbc4bd42d798262feaf9b109fc',
        name: 'Alex & Ally',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/fb3d29b150ab490aa203ada7b68cc42b'
    },
    '99cef0bf72a54b47a5d69d3c4c2c5ff7': {
        id: '99cef0bf72a54b47a5d69d3c4c2c5ff7',
        name: 'Hannah & Leanne',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/18c2f8f65ff947cb8bab38fdb914684a'
    },
    '9c67c1b94e5d4ad5a1cbe439ac62eb75': {
        id: '9c67c1b94e5d4ad5a1cbe439ac62eb75',
        name: 'Irène Kaymer',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/af888565faa94a55a9cb4731db44d715'
    },
    '9d65b63171364dc4810a53eeac45fe31': {
        id: '9d65b63171364dc4810a53eeac45fe31',
        name: 'Cody & Leanne',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/dc451a0ad4b84d5cb2a347eb3f4cc27e'
    },
    'accfd3433b064508845d7696dab959fd': {
        id: 'accfd3433b064508845d7696dab959fd',
        name: 'Benny Adami',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/977e5fb5590f405c926527d337588fe8'
    },
    'b16d1fcd134345b1a0c94336b4895f22': {
        id: 'b16d1fcd134345b1a0c94336b4895f22',
        name: 'Jess & Robin',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/eef04d557a614ea5aa81ae7a463537d8'
    },
    'baf5dfb4c6ac4968b2cb7f8f8cc0ef10': {
        id: 'baf5dfb4c6ac4968b2cb7f8f8cc0ef10',
        name: 'Cody Rigsby',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/51c3f94bb1d24d1daf56856d06cfd53b'
    },
    'c0a9505d8135412d824cf3c97406179b': {
        id: 'c0a9505d8135412d824cf3c97406179b',
        name: 'Leanne Hainsby-Alldis',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/93f59d0c1400427cbbdd7045751dc2a8'
    },
    'c406f36aa2a44a5baf8831f8b92f6920': {
        id: 'c406f36aa2a44a5baf8831f8b92f6920',
        name: 'Robin Arzón',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/0be36e24b9b0450da37ef3d36c0ede00'
    },
    'c9bd86e59b9b4f96981848467838aa9c': {
        id: 'c9bd86e59b9b4f96981848467838aa9c',
        name: 'Tunde Oyeneyin',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/886e19ea07904669b9aebba125fd24a3'
    },
    'dd1300f8c5264d6f94d33cf4857b1159': {
        id: 'dd1300f8c5264d6f94d33cf4857b1159',
        type: 'other',
        name: 'Bradley & Sam',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/d57c3b0c021349779fe0f2a79e4c4049'
    },
    'e0c54c13f8a2480e90987e2faf16b91e': {
        id: 'e0c54c13f8a2480e90987e2faf16b91e',
        name: 'Camila & Tunde',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/39ea2131ffc24538bac93e298776c9f8'
    },
    'e14f9f2c08fe448197fd56ab5ff1f065': {
        id: 'e14f9f2c08fe448197fd56ab5ff1f065',
        name: 'Emma & Leanne',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/a6171aa5c18143b9a32b2291d36c800c'
    },
    'e2b47232c29844c380f0a5374317a3c9': {
        id: 'e2b47232c29844c380f0a5374317a3c9',
        name: 'Mila Lazar',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/062e84c6d03c437ebb2da177f23a58ee'
    },
    'e2e6586d898d4422b3f6e3a259ff3f90': {
        id: 'e2e6586d898d4422b3f6e3a259ff3f90',
        name: 'Cliff Dwenger',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/fcd5f08e24e14fefaf2d16d9ae0cefa0'
    },
    'e9e1c50f025a4b42b35e7df609fe2899': {
        id: 'e9e1c50f025a4b42b35e7df609fe2899',
        name: 'Ally & Cliff',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/de05c06ff4fa4d9e8e577dd9183beca9'
    },
    'f2375e0aba4f41cc8acb2b544fe45219': {
        id: 'f2375e0aba4f41cc8acb2b544fe45219',
        name: 'Multiple Instructors',
        type: 'other',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/0b84fcb079254a86a40c1c2e4368f7a3'
    },
    'f6f2d613dc344e4bbf6428cd34697820': {
        id: 'f6f2d613dc344e4bbf6428cd34697820',
        name: 'Emma Lovewell',
        image_url: 'https://s3.amazonaws.com/workout-metric-images-prod/cd218b7caf8d45c795d635027bfbdd30'
    }
} as const;
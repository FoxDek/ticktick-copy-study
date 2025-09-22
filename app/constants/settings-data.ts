const modulesData = [
  {
    id: 'calendar',
    title: 'Календарь',
    description: 'Управляйте вашими задачами в шести видах календаря.',
    image: '/calendar-demo.png',
  },
  {
    id: 'matrix',
    title: 'Матрица Эйзенхауэра',
    description: 'Сосредоточьтесь на важных и срочных вещах.',
    image: '/matrix-demo.png',
  },
  {
    id: 'habits',
    title: 'Привычка',
    description: 'Сформируйте привычку и следите за ней.',
    image: '/habits-demo.png',
  },
  {
    id: 'pomodoro',
    title: 'Помодоро',
    description: 'Используйте таймер или секундомер Помодоро, чтобы сохранить концентрацию.',
    image: '/pomodoro-demo.png',
  },
  {
    id: 'countdown',
    title: 'Обратный отсчет',
    description: 'Запомните каждый особенный день.',
    image: '/countdown-demo.png',
  },
];

const premiumDetailsData = [
  {
    imageProps: "bg-position-[0_-360px]",
    title: "Подписаться на календарь",
    description: "Подписка на календарь в TickTick, доступ ко всем вашим задачам в одном месте, вы можете получать напоминания о времени."
  },
  {
    imageProps: "bg-position-[-200px_0]",
    title: "Календарь",
    description: "Полноценный календарь, для упорядочивания своей повестки дня."
  },
  {
    imageProps: "bg-position-[0_-240px]",
    title: "Мини-календарь",
    description: "Просмотр и управление задачами в один день. Составьте свой ежедневный план полностью и удобным способом."
  },
  {
    imageProps: "bg-position-[-200px_-120px]",
    title: "Дополнительные списки и задачи",
    description: "Больше списков, задач и элементов проверки для вас, управлять всем неограниченно с помощью TickTick."
  },
  {
    imageProps: "bg-position-[0_-120px]",
    title: "Фильтры",
    description: "Фильтруйте задачи, чтобы сосредоточиться, основываясь на ваших потребностях."
  },
  {
    imageProps: "bg-position-[-400px_-360px]",
    title: "Уведомления для чек-листа",
    description: "Установите напоминание для проверки пункта, никогда не забывайте вещь, какой бы маленькой она не была."
  },
  {
    imageProps: "bg-position-[-200px_-240px]",
    title: "Несколько напоминаний",
    description: "Для того что бы не пропускать выжные задачи, вы можете добавлять до 5 напоминаний для каждой задачи."
  },
  {
    imageProps: "bg-position-[0_0]",
    title: "Больше прикрепленных файлов",
    description: "Загружайте до 99 изображений, аудиозаписей и других файлов за день. Легче схватывайте вашу задачу."
  },
  {
    imageProps: "bg-position-[-400px_-120px]",
    title: "Больше участников",
    description: "Делитесь задачами с другими пользователями (До 29 пользователей). Легко сотрудничайте со своими друзьями или коллегами, чтобы добиться больших успехов."
  },
  {
    imageProps: "bg-position-[-200px_-480px]",
    title: "Списки и История Активности",
    description: "Отслеживайте всю вашу историю изменений каждого списка и задачи. Больше не стоит беспокоится о ошибки при редактировании."
  },
  {
    imageProps: "bg-position-[-400px_0]",
    title: "Расширенный поиск",
    description: "Используйте фильтры для быстрого поиска задач. Наслаждайтесь удобством и более эффективной работой."
  },
]

const userChosenDefaultSmarts = [
  {name: 'all', mode: 'show'},
  {name: 'today', mode: 'not-empty'},
  {name: 'tomorrow', mode: 'show'},
  {name: 'next7days', mode: 'show'},
  {name: 'assignedToMe', mode: 'show'},
  {name: 'inbox', mode: 'show'},
  {name: 'summary', mode: 'show'},
  {name: 'tags', mode: 'show'},
  {name: 'filters', mode: 'show'},
  {name: 'completed', mode: 'show'},
  {name: 'cancelled', mode: 'show'},
  {name: 'deleted', mode: 'show'},
];

const smartlistOptionsLabels = {
  'show': 'Показать',
  'hide': 'Скрыть',
  'not-empty': 'Показывать, если не пусто',
}

const smartlistSettingsLabels = {
  'all': 'Все',
  'today': 'Сегодня',
  'tomorrow': 'Завтра',
  'next7days': 'Следующие 7 дней',
  'assignedToMe': 'Назначено мне',
  'inbox': 'Входящие',
  'summary': 'Сводка',
  'tags': 'Метки',
  'filters': 'Фильтры',
  'completed': 'Выполнено',
  'cancelled': 'Не будет выполнено',
  'deleted': 'Корзина',
}

const smartlistSettings = {
  'all': ['show', 'hide'],
  'today': ['not-empty', 'show', 'hide'],
  'tomorrow': ['not-empty', 'show', 'hide'],
  'next7days': ['not-empty', 'show', 'hide'],
  'assignedToMe': ['not-empty', 'show', 'hide'],
  'inbox': ['show', 'not-empty'],
  'summary': ['show', 'hide'],
  'tags': ['not-empty', 'show', 'hide'],
  'filters': ['show', 'hide'],
  'completed': ['show', 'hide'],
  'cancelled': ['not-empty','show', 'hide'],
  'deleted': ['show', 'hide'],
}

const userNotificationsDefaultSettings = {
  dailyNotifications: true,
  dailyNotificationsTime: '9:00',
  webNotifications: true,
  emailNotifications: false,
}

const dateTimeDefaultSettings = {
  timeFormat: '24',
  firstWeekDay: 'monday',
  additionalCalendar: 'none',
  showWeeksNumbers: true,
  timeZone: false
}

const dateTimeSettingsOptions = {
  timeFormat: ['12', '24'],
  firstWeekDay: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
  additionalCalendar: [
    'none',
    'vietnamese_lunar',
    'hebrew',
    'indian',
    'islamic_civil',
    'islamic_umalqura',
    'islamic_tabular',
    'chinese_lunar',
    'korean_lunar',
    'persian'
]
}

const dateTimeOptionsLabels = {
  timeFormat: {
    '12': '12-часовой (1:00 PM)',
    '24': '24-часовой (13:00)'
  },
  firstWeekDay: {
    'monday': 'Понедельник',
    'tuesday': 'Вторник',
    'wednesday': 'Среда',
    'thursday': 'Четверг',
    'friday': 'Пятница',
    'saturday': 'Суббота',
    'sunday': 'Воскресенье'
  },
  additionalCalendar: {
    'none': 'Нет',
    'vietnamese_lunar': 'Вьетнамский лунный',
    'hebrew': 'Иврит',
    'indian': 'Индийский',
    'islamic_civil': 'Исламский (Гражданский)',
    'islamic_umalqura': 'Исламский (Кувейтский)',
    'islamic_tabular': 'Исламский (Саудовский)',
    'chinese_lunar': 'Китайский лунный',
    'korean_lunar': 'Корейский лунный',
    'persian': 'Персидский календарь'
  }
}

const userThemeDefaultSettings = {
  theme: 'lilac',
  sidebars: 'all',
  completedStyle: 'default'
}

const colorThemes = ['default', 'sky', 'turquoise', 'teal', 'green', 'apricot', 'peach', 'lilac', 'ebony', 'blue', 'gray', 'dark']
const towmThemes = ['Cairo', 'London', 'Los Angeles', 'Moscow', 'New York', 'San Francisco', 'Seoul', 'Shanghai', 'Sydney', 'Tokyo']
const seasonsThemes = ['spring', 'summer', 'autumn', 'winter']
const photosThemes = ['architecture', 'black and white', 'desert', 'plants', 'martin', 'dawn', 'blossoming', 'frozen', 'meadow', 'silence']

const themeSettingsOptions = {
  theme: {
    colorThemes,
    towmThemes,
    seasonsThemes,
    photosThemes
  },
  sidebars: ['all', 'hide_note', 'hide'],
  completedStyle: ['default', 'strikethrough']
}

const themeSettingsOptionsLabels = {
  theme: {
    'default': 'По умолчанию',
    'sky': 'Небо',
    'turquoise': 'Бирюза',
    'teal': 'Теал',
    'green': 'Зеленый',
    'apricot': 'Абрикос',
    'peach': 'Персик',
    'lilac': 'Сирень',
    'ebony': 'Эбен',
    'blue': 'Синий',
    'gray': 'Серый',
    'dark': 'Темный',
    'Cairo': 'Каир',
    'London': 'Лондон',
    'Los Angeles': 'Лос-Анджелес',
    'Moscow': 'Москва',
    'New York': 'Нью-Иорк',
    'San Francisco': 'Сан-Франциско',
    'Seoul': 'Сеул',
    'Shanghai': 'Шанхаи',
    'Sydney': 'Сиднеи',
    'Tokyo': 'Токио',
    'spring': 'Весна',
    'summer': 'Лето',
    'autumn': 'Осень',
    'winter': 'Зима',
    'architecture': 'Архитектура',
    'black and white': 'Черно-белый',
    'desert': 'Пустыня',
    'plants': 'Зелень',
    'martin': 'Ласточка',
    'dawn': 'Рассвет',
    'blossoming': 'Расцветание',
    'frozen': 'Замороженный',
    'meadow': 'Луг',
    'silence': 'Молчание'
  },
  sidebars: {
    'all': 'Показать (Все)',
    'hide_note': 'Показать (Скрыть заметку)',
    'hide': 'Скрыть (Все)'
  },
  completedStyle: {
    'default': 'По умолчанию',
    'strikethrough': 'Зачеркивание'
  }
}

const themeSidebarsOptionsData = {
  all: {
    todayCount: 3,
    inboxCount: 16,
  },
  hide_note: {
    todayCount: 3,
    inboxCount: 10,
  },
  hide: {
    todayCount: 0,
    inboxCount: 0,
  }
}

const themeSettingsCoversSources = {
    'Cairo': '/calendar-demo.png',
    'London': '/calendar-demo.png',
    'Los Angeles': '/calendar-demo.png',
    'Moscow': '/calendar-demo.png',
    'New York': '/calendar-demo.png',
    'San Francisco': '/calendar-demo.png',
    'Seoul': '/calendar-demo.png',
    'Shanghai': '/calendar-demo.png',
    'Sydney': '/calendar-demo.png',
    'Tokyo': '/calendar-demo.png',
    'spring': '/calendar-demo.png',
    'summer': '/calendar-demo.png',
    'autumn': '/calendar-demo.png',
    'winter': '/calendar-demo.png',
    'architecture': '/calendar-demo.png',
    'black and white': '/calendar-demo.png',
    'desert': '/calendar-demo.png',
    'plants': '/calendar-demo.png',
    'martin': '/calendar-demo.png',
    'dawn': '/calendar-demo.png',
    'blossoming': '/calendar-demo.png',
    'frozen': '/calendar-demo.png',
    'meadow': '/calendar-demo.png',
    'silence': '/calendar-demo.png'
}

const userMoreDefaultSettings = {
  language: 'ru',
  smartRecognition: {
    dateRecognition: true,
    datesRecognitionTextDeleting: true,
    tagsRecognition: true,
    tagsRecognitionTextDeleting: true
  },
  defaultValues: {
    date: 'none',
    notification: 'during',
    notificationAllDay: 'none',
    priority: 'default',
    tags: '',
    mainList: 'inbox',
    addTo: 'list-top',
    overdueTo: 'list-top'
  },
  miniCalendar: false,
  taskTemplate: 'none'
}

export { modulesData, premiumDetailsData, userChosenDefaultSmarts, smartlistOptionsLabels, smartlistSettingsLabels, smartlistSettings, userNotificationsDefaultSettings, dateTimeDefaultSettings, dateTimeSettingsOptions, dateTimeOptionsLabels, userThemeDefaultSettings, themeSettingsOptions, themeSettingsOptionsLabels, themeSidebarsOptionsData, themeSettingsCoversSources, userMoreDefaultSettings };
'use client';
import { cva } from "class-variance-authority";
import CrossIcon from '@/public/cross-icon.svg'
import { useEffect, useState } from "react";
import { useGroupsActions } from "@/app/hoocs/useGroupsActions";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { icons } from '../app/iconsLibrary';
import Loader from "./Loader";
import IconsMenu from './menu-components/IconsMenu';

const createGroupSubstrate = cva(
  "createGroupSubstrate absolute z-50 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-4 px-6 rounded-md shadow-xl/20 flex flex-col gap-4 items-center justify-center max-w-sm w-full text-sm"
);
const createGroupTitle = cva("createGroupTitle font-bold text-base");
const createGroupForm = cva("createGroupForm relative w-full border border-gray-200 rounded-md flex items-center gap-2 px-2");
const createGroupFormIcon = cva("createGroupFormIcon aspect-square flex items-center justify-center max-h-4.5 h-full w-auto group rounded-sm cursor-pointer");
const createGroupFormInput = cva("createGroupFormInput text-sm outline-none w-full placeholder:text-black/25");
const createGroupFormDivider = cva("createGroupFormDivider h-full w-[1px] bg-gray-200 py-1.5");
const createGroupSettingMenu = cva("createGroupSettingMenu grid gap-2 w-full grid-cols-[120px_1fr] items-center ");
const createGroupSubtitle = cva("createGroupSubtitle text-sm leading-3.5 text-gray-500");
const createGroupSelect = cva("createGroupSelect relative px-2 py-1.5 rounded-md bg-white border  hover:border-[#a596e0] cursor-pointer duration-100 ease-in-out", {
  variants: {
    active: {
      true: 'border-[#a596e0]',
      false: 'border-gray-200',
    }
  }
});
const createGroupDropdownList = cva("createGroupDropdownList absolute top-9 left-0  w-full bg-white border border-gray-200 shadow-xl/20 rounded-md p-1 z-10")
const dropdownListItem = cva("dropdownListItem flex items-center gap-1 py-1 px-1.5 hover:bg-gray-100 cursor-pointer")
const createGroupColorList = cva('createGroupColorList flex gap-2 col-span-1')
const createGroupColorItem = cva("createGroupColorItem relative aspect-square h-4 rounded-full cursor-pointer", {
  variants: {
    active: {
      true: 'outline-2 outline-offset-1 outline-[#a596e0]',
    }
  }
});
const createGroupButtons = cva("createGroupButtons flex w-full gap-2 justify-end items-center mt-5")
const createGroupButton = cva("createGroupButton px-4.5 py-1 text-sm rounded-md cursor-pointer duration-200 ease-in-out")






interface CreateGroupMenuProps {
  setOpenCreateGroupMenu: (value: boolean) => void;
  setEditingGroupId: (value: Id<"taskGroups"> | null) => void;
  editingGroupId: Id<"taskGroups"> | null;
}

export default function CreateGroupMenu({setOpenCreateGroupMenu, setEditingGroupId, editingGroupId}: CreateGroupMenuProps) {
  const [inputValue, setInputValue] = useState('');
  const [activeColor, setActiveColor] = useState('none');
  const [actvieDropdownMenu, setActiveDropdownMenu] = useState('');
  const [activeIcon, setActiveIcon] = useState<keyof typeof icons>("newList");
  const [parentFolder, setParentFolder] = useState('none');
  const [listType, setListType] = useState('list');
  const [displayInSmartList, setDisplayInSmartList] = useState(true);
  const {handleCreateCustomGroup, handleUpdateCustomGroup} = useGroupsActions()
  const [iconsMenuIsOpen, setIconsMenuIsOpen] = useState(false);

  const editingGroup = useQuery(api.groupsFunctions.getCustomGroup, editingGroupId ? {groupId: editingGroupId} : 'skip');
  const IconComponent = icons[activeIcon];

  useEffect(() => {
    if (editingGroup) {
      setInputValue(editingGroup.name);
      setActiveColor(editingGroup.color);
      setActiveIcon(editingGroup.icon);
    }
  }, [editingGroup]);

  const handleSelectClick = (menuTitle: string) => {
    if (actvieDropdownMenu === menuTitle) {
      setActiveDropdownMenu('');
    } else {
      setActiveDropdownMenu(menuTitle);
    }
  }

  const handleCreateButton = () => {

    if (editingGroupId) {
      handleUpdateCustomGroup({groupId: editingGroupId, patch: { name: inputValue, color: activeColor, icon: activeIcon }});
      setEditingGroupId(null);
    } else {
      handleCreateCustomGroup({name: inputValue, color: activeColor, icon: activeIcon});
    }
    setOpenCreateGroupMenu(false);
    setInputValue('');
    setActiveColor('none');
    setParentFolder('none');
    setListType('list');
    setDisplayInSmartList(true);
  }

  useEffect(() => {
    setActiveDropdownMenu('');
  }, [displayInSmartList, parentFolder, listType]);

  const handleCloseCreateGroupMenu = () => {
    setEditingGroupId(null);
    setOpenCreateGroupMenu(false);
    setInputValue('');
    setActiveColor('none');
    setParentFolder('none');
    setListType('list');
    setDisplayInSmartList(true);
  }


  if (editingGroupId && editingGroup === undefined) {
    return (
      <div className={createGroupSubstrate({className: 'flex items-center justify-center w-full h-full max-h-[354px] max-w-[384px]'})}>
        <Loader spinnerColor='text-[#a596e0]'/>
      </div>
    )
  }



  return (
    <div className={createGroupSubstrate()}>
      <h2 className={createGroupTitle()}>Создать список</h2>
      <div className={createGroupForm()}>
        <span className={createGroupFormIcon()} onClick={() => setIconsMenuIsOpen(!iconsMenuIsOpen)}>
          {/* <CrossIcon className='iconSvg w-full h-full fill-icons text-icons' /> */}
          <IconComponent className='iconSvg w-full h-full fill-icons text-icons'/>
        </span>
        <div className={createGroupFormDivider()}>&nbsp;</div>
        <input type="text" name="groupName" className={createGroupFormInput()} placeholder="Имя" value={inputValue} onChange={(e) => setInputValue(e.target.value)} maxLength={20}/>

        {iconsMenuIsOpen && <IconsMenu activeIcon={activeIcon} setActiveIcon={setActiveIcon} setIconsMenuIsOpen={setIconsMenuIsOpen}/>}

      </div>

      <div className={createGroupSettingMenu()}>
        <span className={createGroupSubtitle()}>Цвет списка</span>
        <ul className={createGroupColorList()}>
          <li className={createGroupColorItem({className: `bg-white border border-gray-300 after:content-[""] after:absolute after:top-1/2 after:left-1/2 after:translate-x-[-50%] after:translate-y-[-50%] after:w-[0.5px] after:h-full after:bg-[#FF6161] after:rotate-45`, active: activeColor === 'none'})} onClick={() => setActiveColor('none')}></li>
          <li className={createGroupColorItem({className: 'bg-[#FF6161]', active: activeColor === '#FF6161'})} onClick={() => setActiveColor('#FF6161')}></li>
          <li className={createGroupColorItem({className: 'bg-[#FFAC38]', active: activeColor === '#FFAC38'})} onClick={() => setActiveColor('#FFAC38')}></li>
          <li className={createGroupColorItem({className: 'bg-[#FFD324]', active: activeColor === '#FFD324'})} onClick={() => setActiveColor('#FFD324')}></li>
          <li className={createGroupColorItem({className: 'bg-[#E6EA49]', active: activeColor === '#E6EA49'})} onClick={() => setActiveColor('#E6EA49')}></li>
          <li className={createGroupColorItem({className: 'bg-[#35D870]', active: activeColor === '#35D870'})} onClick={() => setActiveColor('#35D870')}></li>
          <li className={createGroupColorItem({className: 'bg-[#4CA1FF]', active: activeColor === '#4CA1FF'})} onClick={() => setActiveColor('#4CA1FF')}></li>
          <li className={createGroupColorItem({className: 'bg-[#6E75F4]', active: activeColor === '#6E75F4'})} onClick={() => setActiveColor('#6E75F4')}></li>
          <li className={createGroupColorItem({className: 'bg-[#FF6161]', active: activeColor === '#FF6161'})} onClick={() => setActiveColor('#FF6161')}></li>
        </ul>
      </div>

      <div className={createGroupSettingMenu()}>
        <span className={createGroupSubtitle()}>Папка</span>
        <div className={createGroupSelect( {active: actvieDropdownMenu === 'parentFolder'})} onClick={() => handleSelectClick('parentFolder')}>
          {parentFolder === 'none' ? 'Нет' : parentFolder}
          <ul className={createGroupDropdownList()} hidden={actvieDropdownMenu !== 'parentFolder'}>
            <li className={dropdownListItem()} onClick={() => {setParentFolder('none')}}>Нет</li>
          </ul>
        </div>
      </div>

      <div className={createGroupSettingMenu()}>
        <span className={createGroupSubtitle()}>Тип списка</span>
        <div className={createGroupSelect( {active: actvieDropdownMenu === 'listType'})} onClick={() => handleSelectClick('listType')}>
          {listType === 'list' ? 'Список задач' : 'Список примечаний'}
          <ul className={createGroupDropdownList()} hidden={actvieDropdownMenu !== 'listType'}>
            <li className={dropdownListItem()} onClick={() => {setListType('list')}}>Список задач</li>
            <li className={dropdownListItem()} onClick={() => {setListType('note')}}>Список примечаний</li>
          </ul>
        </div>
      </div>

      <div className={createGroupSettingMenu()}>
        <span className={createGroupSubtitle()}>Показывать в умном списке</span>
        <div className={createGroupSelect( {active: actvieDropdownMenu === 'displayInSmartList'})} onClick={() => handleSelectClick('displayInSmartList')}>
          {displayInSmartList ? 'Все задачи' : 'Не показывать'}
          <ul className={createGroupDropdownList()} hidden={actvieDropdownMenu !== 'displayInSmartList'}>
            <li className={dropdownListItem()} onClick={() => {setDisplayInSmartList(true)}}>Все задачи</li>
            <li className={dropdownListItem()} onClick={() => {setDisplayInSmartList(false)}}>Не показывать</li>
          </ul>
        </div>
      </div>

      <div className={createGroupButtons()}>
        <button className={createGroupButton( {className: 'border border-gray-200 text-gray-500 hover:bg-gray-100'})} onClick={() => handleCloseCreateGroupMenu()}>Отмена</button>
        <button className={createGroupButton({className: `bg-[#a596e0] text-white opacity-70 ${inputValue === '' ? '!cursor-not-allowed pointer-events-none' : '!bg-[#7c62db]'}`})}onClick={() => {handleCreateButton()}}>
          {editingGroupId ? 'Сохранить' : 'Создать'}
        </button>
      </div>

      <span className="absolute top-3 right-3 aspect-square flex items-center justify-center max-h-4 h-full w-auto group rounded-sm cursor-pointer" onClick={() => handleCloseCreateGroupMenu()}>
        <CrossIcon className='iconSvg w-full h-full fill-icons text-icons' />
      </span>
    </div>
  );
}
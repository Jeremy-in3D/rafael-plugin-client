export function countCheckedItems(checklistData: any[]): number {
  let checkedCount = 0;

  checklistData.forEach((item) => {
    item.chapter.tasks.forEach((task: any) => {
      task.checkListData.forEach((checklistItem: any) => {
        if (checklistItem.isChecked || checklistItem.isChecked === false) {
          checkedCount++;
        }
      });
    });
  });

  return checkedCount;
}

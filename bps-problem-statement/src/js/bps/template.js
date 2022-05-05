import { util } from './util';

function rowTemplate(item, heads) {
    function displayDate(key) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var d = new Date();
        var updateDate = new Date(parseInt(key));

        if (d.getFullYear() == updateDate.getFullYear()) {
            if (d.getMonth() == updateDate.getMonth() && d.getDate() == updateDate.getDate()) {
                return "Today";
            }

            return updateDate.getDate()+ ' ' + months[updateDate.getMonth()];
        }

        return `${updateDate.getDate()}/${updateDate.getMonth()}/${updateDate.getFullYear()}`;
    }

    function updates(updates) {
        var oUpdate = util.getReverseOrdered(updates);
        var updatesStr = '';

        for (let key in oUpdate) {
            updatesStr += `<li class="row col-md-12"><p class="col-md-10 update">${ oUpdate[key] }</p><p class="col-md-2 update-date">${ displayDate(key) }</p></li>`;
        }

        return updatesStr;
    }

    return `<td>
            <div class="title-view">
                ${ item.problem_need_statement }
            </div>
            <div class="detail-view">
                <div class="row">
                    <div class="col-md-12 edit-container"><a href="#" class="edit-icon float-right"><i class="fa fa-edit"></i></a></div>
                    <div class="col-md-6"> ${ heads.division }: <b><span>${ item.division }</span></b><input value="${ item.division }" class="division"/></div>
                    <div class="col-md-6">${ heads.status }: <b><span>${ item.status }</span></b><input value="${ item.status }" class="status"/></div>
                    <div class="col-md-6">${ heads.start_date }: <b><span>${ util.formatDate(item.start_date) }</span></b><input type="date" value="${ util.inputFormat(item.start_date) }" class="start_date"/></div>
                    <div class="col-md-6">${ heads.due_date }: <b><span>${ util.formatDate(item.due_date) }</span></b><input type="date" value="${ util.inputFormat(item.due_date) }" class="due_date"/></div>
                    <div class="col-md-6">${ heads.completion_date }: <b><span>${ util.formatDate(item.completion_date) }</span></b><input type="date" value="${ util.inputFormat(item.completion_date) }" class="completion_date"/></div>
                    <div class="col-md-6">${ heads.team_impacted }: <b><span>${ item.team_impacted }</span></b><input value="${ item.team_impacted }" class="team_impacted"/></div>
                    <div class="col-md-6">Priority: <b><span>${ item.priority }</span></b><input value="${ item.priority }" class="priority"/></div>
                    <div class="col-md-6">Age: <b><span>${ item.age }</span></b><input value="${ item.age }" class="age"/></div>
                    <div class="col-md-6">${ heads.team_assigned_to }: <b><span>${ item.team_assigned_to }</span></b><input value="${ item.team_assigned_to }" class="team_assigned_to"/></div>

                    <div class="col-md-12"><b class="vertical-align">${ heads.problem_need_statement }:</b> <span>${ item.problem_need_statement }</span><textarea class="problem_need_statement">${ item.problem_need_statement }</textarea></div>
                    <div class="col-md-10"><a href="#floppy-o" class="save-icon"><i class="fa fa-save"></i> save</a></div>
                    <div class="col-md-2"><a class="cancel-icon float-right"> cancel </a></div>
                    <div class="col-md-12"><a href="#plus-circle" class="add-progress-btn"><i class="fa fa-plus-circle"></i>Add Progress</a></div>
                    <div class="col-md-12 updates">
                        <ul class="col-md-12">
                            <h3>Weekly Updates</h3>
                            <hr/>
                            ${updates(item.updates)}
                        </ul>
                    </div>
                </div>
            </div>
        </td>
    `;
}

export { rowTemplate };
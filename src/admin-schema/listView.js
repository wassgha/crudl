import { Joi, defineActions, definePermissions, stringOrReactProperty } from './base'

import filters from './filters'
import listViewField from './listViewField'
import bulkActions from './bulkActions'

const listView = Joi.object().provideId().keys({
    // Required
    path: Joi.string().required(),
    title: Joi.string().required(),
    icon: Joi.string().required(),
    fields: Joi.array().items(listViewField).required(),
    actions: defineActions(['list']).required(),
    // Optional
    filters,
    search: Joi.object().keys({
        name: Joi.string().required(),
    }),
    normalize: Joi.func().default(data => data),
    paginationComponent: Joi.func(),
    permissions: definePermissions('list'),
    id: Joi.string(),
    bulkActions,

    // before/after optional
    before: stringOrReactProperty(''),
    after: stringOrReactProperty(''),
})

export default listView

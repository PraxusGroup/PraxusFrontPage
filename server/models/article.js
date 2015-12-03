module.exports = function(Article) {

  Article.validatesUniquenessOf('slug');

  Article.observe('before save', function addSlug(ctx, next) {

    var instance = false;

    if(ctx.instance)
      instance = 'instance';
    else
      instance = 'data';

    if (instance) {

      ctx[instance].slug = createSlug(ctx[instance].category, ctx[instance].title);

      next();

    } else {
      next();
    }

    function createSlug(category, title) {
      return (category.replace(' ', '-') + '-' + title.replace(' ', '-')).toLowerCase();
    }

  });
};

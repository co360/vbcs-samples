/**
 * Copyright (c) 2018, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 */
define([
  'text!resources2/config/navigation-menu.json',
  'text!resources2/config/demos.json',
  
  
  
  
  
  
  
], function(
  navigationMenu, demos,
  
  
  
  
  
) {
  'use strict';

  var AppModule = function AppModule() {

    // by default disable offline toolkit:
    // this.forceOffline();

    this.metadata = {
      navigationMenu: JSON.parse(navigationMenu),
      demos: JSON.parse(demos)
    };
  };

  /**
   * Returns metadata describing recipes and navigation menu
   */
  AppModule.prototype.getMetadata = function() {
    return this.metadata;
  };

  /**
   * Returns metadata describing recipes only
   */
  AppModule.prototype.getDemosMetadata = function() {
    return this.metadata.demos;
  };

  /**
   * Returns metadata describing navigation menu
   */
  AppModule.prototype.getNavigationMetadata = function() {
    return this.metadata.navigationMenu;
  };

  /**
   * For given recipeID return assorted information about the recipe
   */
  AppModule.prototype.getRecipe = function(currentSelection) {
    var key = currentSelection;
    var recipe;
    if (key === undefined || key.length === 0 || key === "home") {
      recipe = {
        "id": "home",
        "label": "All Recipes",
        "apiRef": []
      };
    } else {
      recipe = this.metadata.demos[key];
    }
    var parents = this._getRecipeParent(recipe.id);
    return {
      recipe: recipe,
      parents: parents[0],
      breadCrumb: parents[1]
    };
  };

  /**
   * For given recipe ID return array with with two arrays.
   * First array contains parent node IDs (for navigation list selection).
   * Second array is content for breadcrumbs navigation
   */
  AppModule.prototype._getRecipeParent = function(recipeId) {
    var results = [];
    var breadCrumb = [];
    this.metadata.navigationMenu.forEach(item => {
      if (!item.items) {
        return;
      }
      item.items.forEach(item2 => {
        item2.items.forEach(item3 => {
          if (item3 === recipeId) {
            results.push(item.id);
            results.push(item2.id);
            breadCrumb.push({
              id: '',
              label: 'Home'
            });
            breadCrumb.push({
              id: item.id,
              label: item.label
            });
            breadCrumb.push({
              id: item2.id,
              label: item2.label
            });
            breadCrumb.push({
              id: item3,
              label: this.metadata.demos[item3].label
            });
          }
        });
      });
    });
    return [results, breadCrumb];
  };

  return AppModule;
});
//
// Copyright (c) 2015 Spotfire AB,
// Forsta Langgatan 26, SE-413 28 Goteborg, Sweden.
// All rights reserved.
//
// This software is the confidential and proprietary information
// of Spotfire AB ("Confidential Information"). You shall not
// disclose such Confidential Information and shall use it only
// in accordance with the terms of the license agreement you
// entered into with Spotfire.
//


var spotfire = { webPlayer : {} };


//
// Enums
//
spotfire.webPlayer.errorCodes =
{
    /// <summary>Error code definitions. Used as argument to the <c>application.onError</c> event.</summary>
    /// <field name="ERROROPEN" type="spotfire.webPlayer.errorCodes">Error code for opening related errors.</field>
    /// <field name="ERRORCLOSE" type="spotfire.webPlayer.errorCodes">Error code for closing of analysis related errors.</field>
    /// <field name="ERRORBOOKMARK" type="spotfire.webPlayer.errorCodes">Error code for bookmark related errors.</field>
    /// <field name="ERRORFILTERING" type="spotfire.webPlayer.errorCodes">Error code for filtering related errors.</field>
    /// <field name="ERRORMARKING" type="spotfire.webPlayer.errorCodes">Error code for marking related errors.</field>
    /// <field name="ERRORPAGES" type="spotfire.webPlayer.errorCodes">Error code for page related errors.</field>
    /// <field name="ERRORINTERNAL" type="spotfire.webPlayer.errorCodes">Error code for internal errors.</field>
    /// <field name="ERRORDOCUMENT" type="spotfire.webPlayer.errorCodes">Error code for document related errors.</field>
    /// <field name="ERRORCALLBACKS" type="spotfire.webPlayer.errorCodes">Error code for API callback related errors.</field>

    ERROROPEN:'ErrorOpen',
    ERRORCLOSE:'ErrorClose',
    ERRORBOOKMARK:'ErrorBookmark',
    ERRORFILTERING:'ErrorFiltering',
    ERRORMARKING:'ErrorMarking',
    ERRORPAGES:'ErrorPages',
    ERRORINTERNAL:'ErrorInternal',
    ERRORDOCUMENT:'ErrorDocument',
    ERRORCALLBACKS:'ErrorCallbacks'
};

spotfire.webPlayer.markingOperation =
{
    /// <summary>Marking operation definitions. Used as argument to the <c>Marking.setMarking</c> function.</summary>
    /// <field name="REPLACE" type="spotfire.webPlayer.markingOperation">Replaces the given marking with the new conditions specified in the where clause.</field>
    /// <field name="ADD" type="spotfire.webPlayer.markingOperation">Add rows from the specified where clause to the given marking.</field>
    /// <field name="SUBTRACT" type="spotfire.webPlayer.markingOperation">Removes rows from the specified where clause in the given marking.</field>
    /// <field name="TOGGLE" type="spotfire.webPlayer.markingOperation">Toggles between the current marking and the result of the specified where clause.</field>
    /// <field name="INTERSECT" type="spotfire.webPlayer.markingOperation">Intersects the current marking with the marking specified in the where clause.</field>
    /// <field name="CLEAR" type="spotfire.webPlayer.markingOperation">Clears the given marking. The where clause will be ignored.</field>

    REPLACE:'Replace',
    ADD:'Add',
    SUBTRACT:'Subtract',
    TOGGLE:'Toggle',
    INTERSECT:'Intersect',
    CLEAR:'Clear'
};

spotfire.webPlayer.filteringOperation =
{
    /// <summary>Filtering operation definitions. Used as argument to the <c>FilterSettings.operation</c> property.</summary>
    /// <field name="ADD" type="spotfire.webPlayer.filteringOperation">Adds values specified in a spotfire.webPlayer.FilterSettings object to the filter.</field>
    /// <field name="REMOVE" type="spotfire.webPlayer.filteringOperation">Removes values specified in a spotfire.webPlayer.FilterSettings object to the filter.</field>
    /// <field name="REPLACE" type="spotfire.webPlayer.filteringOperation">Replaces all values in the filter with the ones specified in a spotfire.webPlayer.FilterSettings object. If the values contains invalid values, the operation will add all valid values and report an error message with the failed ones.</field>
    /// <field name="ADD_ALL" type="spotfire.webPlayer.filteringOperation">Adds all values to the filter. The values property in spotfire.webPlayer.FilterSettings must not be set.</field>
    /// <field name="REMOVE_ALL" type="spotfire.webPlayer.filteringOperation">Removes all values from the filter. The values property in spotfire.webPlayer.FilterSettings must not be set.</field>
    /// <field name="RESET" type="spotfire.webPlayer.filteringOperation">Resets the filter to its default state.</field>

    ADD:'Add',
    REMOVE:'Remove',
    REPLACE:'Replace',
    ADD_ALL:'AddAll',
    REMOVE_ALL:'RemoveAll',
    RESET:'Reset'
};

spotfire.webPlayer.includedFilterSettings =
{
    /// <summary>Defines what settings to include when getting filter columns.</summary>
    /// <field name="NONE" type="spotfire.webPlayer.includedFilterSettings">Do not include any filter settings.</field>
    /// <field name="ALL_WITH_CHECKED_HIERARCHY_NODES" type="spotfire.webPlayer.includedFilterSettings">Include all filter settings. Represent hierarchy paths with checked nodes.</field>
    /// <field name="ALL_WITH_UNCHECKED_HIERARCHY_NODES" type="spotfire.webPlayer.includedFilterSettings">Include all filter settings. Represent hierarchy paths with unchecked nodes.</field>

    NONE:'None',
    ALL_WITH_CHECKED_HIERARCHY_NODES:'AllWithCheckedHierarchyNodes',
    ALL_WITH_UNCHECKED_HIERARCHY_NODES:'AllWithUncheckedHierarchyNodes'
};

spotfire.webPlayer.columnDataType =
{
    /// <summary>Defines data column data types.</summary>
    /// <field name="STRING" type="spotfire.webPlayer.columnDataType">Represents a string.</field>
    /// <field name="INTEGER" type="spotfire.webPlayer.columnDataType">Represents an integer.</field>
    /// <field name="REAL" type="spotfire.webPlayer.columnDataType">Represents a real number.</field>
    /// <field name="DATE_TIME" type="spotfire.webPlayer.columnDataType">Represents a date time.</field>
    /// <field name="DATE" type="spotfire.webPlayer.columnDataType">Represents a date.</field>
    /// <field name="TIME" type="spotfire.webPlayer.columnDataType">Represents a time.</field>
    /// <field name="CURRENCY" type="spotfire.webPlayer.columnDataType">Represents a currency.</field>
    /// <field name="BINARY" type="spotfire.webPlayer.columnDataType">Represents binary.</field>
    /// <field name="BOOLEAN" type="spotfire.webPlayer.columnDataType">Represents a boolean.</field>
    /// <field name="LONG_INTEGER" type="spotfire.webPlayer.columnDataType">Represents a long integer.</field>
    /// <field name="TIME_SPAN" type="spotfire.webPlayer.columnDataType">Represents a time span.</field>
    /// <field name="SINGLE_REAL" type="spotfire.webPlayer.columnDataType">Represents a single real.</field>

    STRING:'String',
    INTEGER:'Integer',
    REAL:'Real',
    DATE_TIME:'DateTime',
    DATE:'Date',
    TIME:'Time',
    CURRENCY:'Currency',
    BINARY:'Binary',
    BOOLEAN:'Boolean',
    LONG_INTEGER:'LongInteger',
    TIME_SPAN:'TimeSpan',
    SINGLE_REAL:'SingleReal'
};

spotfire.webPlayer.filterType =
{
    /// <summary>Defines filter types.</summary>
    /// <field name="UNDEFINED" type="spotfire.webPlayer.filterType">Represents a undefined filter.</field>
    /// <field name="TEXT_FILTER" type="spotfire.webPlayer.filterType">Represents a text filter.</field>
    /// <field name="CHECK_BOX_FILTER" type="spotfire.webPlayer.filterType">Represents a checkbox filter.</field>
    /// <field name="RANGE_FILTER" type="spotfire.webPlayer.filterType">Represents a range filter.</field>
    /// <field name="LIST_BOX_FILTER" type="spotfire.webPlayer.filterType">Represents a listbox filter.</field>
    /// <field name="RADIO_BUTTON_FILTER" type="spotfire.webPlayer.filterType">Represents a radio button filter.</field>
    /// <field name="ITEM_FILTER" type="spotfire.webPlayer.filterType">Represents a item filter.</field>
    /// <field name="CHECK_BOX_HIERARCHY_FILTER" type="spotfire.webPlayer.filterType">Represents a checkbox hierarchy filter.</field>

    UNDEFINED:'Undefined',
    TEXT_FILTER:'TextFilter',
    CHECK_BOX_FILTER:'CheckBoxFilter',
    RANGE_FILTER:'RangeFilter',
    LIST_BOX_FILTER:'ListBoxFilter',
    RADIO_BUTTON_FILTER:'RadioButtonFilter',
    ITEM_FILTER:'ItemFilter',
    CHECK_BOX_HIERARCHY_FILTER:'CheckBoxHierarchyFilter'
};

//
// Classes
//

// ******** Class: Customization ********************************************
spotfire.webPlayer.Customization = function()
{
    /// <summary>Customize the appearance of the Web Player. All have default value true, except panels that have null.</summary>
    /// <field name="showCustomizableHeader" type="Boolean">Shows/hides the customizable header (including the logo).</field>
    /// <field name="showClose" type="Boolean">Shows/hides the analysis close menu item.</field>
    /// <field name="showToolBar" type="Boolean">Shows/hides the analysis toolbar and menu.</field>
    /// <field name="showExportFile" type="Boolean">Shows/hides the export file menu item.</field>
    /// <field name="showExportVisualization" type="Boolean">Shows/hides the export visualization menu item.</field>
    /// <field name="showUndoRedo" type="Boolean">Shows/hides the undo/redo menu item.</field>
    /// <field name="showDodPanel" type="Boolean" mayBeNull="true">Shows/hides the details on demand panel in the visualization. If null (default value), panel is shown as saved in the analysis.</field>
    /// <field name="showFilterPanel" type="Boolean" mayBeNull="true">Shows/hides the filter panel. If null (default value), panel is shown as saved in the analysis.</field>
    /// <field name="showPageNavigation" type="Boolean">Shows/hides the page navigation controls in the analysis.</field>
    /// <field name="showStatusBar" type="Boolean">Shows/hides statusbar in the Web Player.</field>
    /// <field name="showReloadAnalysis" type="Boolean">Shows/hides the Reload analysis button in the toolbar (for Scheduled Updates).</field>
    /// <field name="showAnalysisInformationTool" type="Boolean">Shows/hides the analysis information tool menu item.</field>
    /// <field name="showHelp" type="Boolean">Shows/hides the help menu item.</field>
    /// <field name="showAbout" type="Boolean">Shows/hides the about menu item.</field>
    /// <field name="showLogout" type="Boolean">Shows/hides the logout menu item.</field>
    /// <field name="showAuthor" type="Boolean">Shows/hides the button for enabling authoring.</field>
    /// <field name="showCollaboration" type="Boolean">Shows/hides the collaboration conversation feature.</field>

    this.showCustomizableHeader = true;
    this.showClose = true;
    this.showToolBar = true;
    this.showExportFile = true;
    this.showExportVisualization = true;
    this.showUndoRedo = true;
    this.showDodPanel = null;
    this.showFilterPanel = null;
    this.showPageNavigation = true;
    this.showStatusBar = true;
    this.showReloadAnalysis = true;
    this.showAnalysisInformationTool = true;
    this.showHelp = true;
    this.showAbout = true;
    this.showLogout = true;
    this.showAuthor = true;
    this.showCollaboration = true;
    if (arguments.length === 1 && arguments[0])
    {
        var key;
        var customization = arguments[0];
        for (key in this)
        {
            if (customization.hasOwnProperty(key) && this.hasOwnProperty(key))
            {
                this[key] = customization[key];
            }
        }
    }
};


// ******** Class: Application ************************************************
spotfire.webPlayer.Application = function(webPlayerServerRootUrl, customizationInfo, analysisPath, parameters, reloadInstances)
{
    /// <summary>The Application class is used to create a Web Player instance. If an analysis is opened, the <c>spotfire.webPlayer.Document</c> object is also accessible from the application.</summary>
    /// <param name="webPlayerServerRootUrl" type="string">The URL to the Web Player server (e.g. 'http://myserver.spotfire.com/spotfire/wp/').</param>
    /// <param name="customizationInfo" type="spotfire.webPlayer.Customization">Instance of the <c>spotfire.webPlayer.Customization</c> class.</param>
    /// <param name="analysisPath" type="string">The path in the library to the analysis to open.</param>
    /// <param name="parameters" type="string">Optional. Load parameters for the analysis (bookmarks, Information Link parameters, etc.). Example: 'Parameters.Param = {val1, "Val 2"}; SetPage(pageIndex = 1); ApplyBookmark(bookmarkName="All");'. For more information see: Parameter Configuration Block.</param>
    /// <param name="reloadInstances" type="Boolean">If <c>true</c>, the javascript API will try to reuse server side instances of loaded documents.</param>
    /// <field name="analysisDocument" type="spotfire.webPlayer.Document">Reference to the first <c>spotfire.webPlayer.Document</c> object. This property will be null if the analysis is not loaded.</field>
    /// <field name="analysisDocuments" parameterArray="true" elementType="spotfire.webPlayer.Document">List of reference to the <c>spotfire.webPlayer.Document</c> objects.</field>

    this._webPlayerServerRootUrl = webPlayerServerRootUrl;
    this._customizationInfo = new spotfire.webPlayer.Customization(customizationInfo);
    this._analysisPath = analysisPath;
    this._reloadInstances = reloadInstances;
    this._parameters = parameters;
    this.analysisDocument = null;
    this.analysisDocuments = [];
    this._document = null;
    this._init();
    this._documentId = null;
    this._pendingOpenViews = [];
    this._openProxyTimeout = 120000;
};

spotfire.webPlayer.Application.prototype.openDocument = function(elementId, initialPage, customizationInfo)
{
    /// <summary>Open the analysis specified by the application. The onOpened event will fire when the document is loaded. Multiple documents can be opened for a single application.</summary>
    /// <param name="elementId" type="string">The id of the DOM element in which to display the Web Player. The Web Player will adapt to the size of this element.</param>
    /// <param name="initialPage" type="object">Optional. Specifies the initial page when opening the analysis. Either page id (boolean) or page title can be used. If not set, the current page of the analysis will be used.</param>
    /// <param name="customizationInfo" type="spotfire.webPlayer.Customization">Optional. Instance of the <c>spotfire.webPlayer.Customization</c> class. Will override customization set on the application.</param>
    /// <returns>An instance of the <c>spotfire.webPlayer.Document</c> class. The API methods can not be used until the onOpened event is fired for this instance.</returns>
    // Handles both ajax communication errors and internal
    // errors such as if the analysis does not exist.

    // Check the path to the web player
    if (!this._webPlayerServerRootUrl || this._webPlayerServerRootUrl.length <= 0)
    {
        this._onErrorCallback(spotfire.webPlayer.errorCodes.ERROROPEN,
            "The web application URL is null or empty.");
        return null;
    }

    // Check the path to the analysis
    if (!this._analysisPath || this._analysisPath.length <= 0)
    {
        this._onErrorCallback(spotfire.webPlayer.errorCodes.ERROROPEN,
            "The analysis path is null or empty.");
        return null;
    }

    if (this._webPlayerServerRootUrl.charAt(this._webPlayerServerRootUrl.length - 1) !== "/")
    {
        this._webPlayerServerRootUrl += "/";
    }

    var parameters = this._parameters || "";

    if (typeof initialPage === "number")
    {
        parameters += "SetPage(pageIndex=" + initialPage + ");";
    }
    else if (typeof initialPage === "string")
    {
        parameters += "SetPage(pageTitle=\"" + initialPage + "\");";
    }

    customizationInfo = new spotfire.webPlayer.Customization(customizationInfo || this._customizationInfo);

    var documentId = null;
    var documentViewId = null;
    var tryReload = false;
    if (this._reloadInstances)
    {
        try
        {
            documentId = window.sessionStorage.getItem("DocumentId:" + this._analysisPath + "/" + elementId);
            documentViewId = window.sessionStorage.getItem("DocumentViewId:" + this._analysisPath + "/" + elementId);
        }
        catch (ignore)
        {
            // Local storage throws 'QUOTA_EXCEEDED_ERR' on Safari in private/incognito browsing mode.
        }

        if (documentId && documentViewId)
        {
            tryReload = true;
        }
        else
        {
            documentId = null;
            documentViewId = null;
        }

    }

    var newDoc = new spotfire.webPlayer.Document(this, elementId, customizationInfo, parameters, documentId, documentViewId);
    newDoc._reloading = tryReload;
    newDoc._setState(spotfire.webPlayer._busyState);
    this.analysisDocuments.push(newDoc);

    if (this.analysisDocument)
    {
        this._pendingOpenViews.push(newDoc);
        this.analysisDocument._loadPendingDocuments();
    }
    else
    {
        this.analysisDocument = newDoc;
        this._document = newDoc;
        this.analysisDocument._loadProxyAndExecute(false, this._onOpenedCallback);
    }

    return newDoc;
};

spotfire.webPlayer.Application.prototype.open = function (analysisPath, divId, parameters, documentId)
{
    /// <summary>OBSOLETE. Use spotfire.webPlayer.Application.openDocument.
    /// Open a given analysis. The onOpened event will fire when the document is loaded.</summary>
    /// <param name="analysisPath" type="string">The path in the library to the analysis to open.</param>
    /// <param name="divId" type="string">The id of the DIV element in which to display the Web Player. The Web Player will adapt to the size of the surrounding DIV.</param>
    /// <param name="parameters" type="string">Load parameters for the analysis (bookmarks, Information Link parameters, etc.). Example: 'Parameters.Param = {val1, "Val 2"}; SetPage(pageIndex = 1); ApplyBookmark(bookmarkName="All");'. For more information see: Parameter Configuration Block.</param>
    /// <param name="documentId" type="string">If set, just refresh an existing web analysis.</param>

    // Handles both ajax communication errors and internal
    // errors such as if the analysis does not exist.

    this._analysisPath = analysisPath;

    if (!this._isBusy() && !this._isOpened())
    {
        if( !this._webPlayerServerRootUrl || this._webPlayerServerRootUrl.length <= 0 )
        {
            this._onErrorCallback(spotfire.webPlayer.errorCodes.ERROROPEN,
                        "The web application URL is null or empty.");
            return;
        }

        if (this._webPlayerServerRootUrl.charAt(this._webPlayerServerRootUrl.length - 1) !== "/")
        {
            this._webPlayerServerRootUrl += "/";
        }
        this.analysisDocument = new spotfire.webPlayer.Document(this, divId, this._customizationInfo, parameters, documentId, documentId ? "0" : null);
        this._document = this.analysisDocument;
        this.analysisDocuments.push(this.analysisDocument);

        this.analysisDocument._setState(spotfire.webPlayer._busyState);

        this.analysisDocument._loadProxyAndExecute(false, this._onOpenedCallback);
    }
    else
    {
        this._onErrorCallback(spotfire.webPlayer.errorCodes.ERROROPEN,
            "Application busy or user not authenticated or document already opened.");
    }
};

spotfire.webPlayer.Application.prototype.close = function()
{
    /// <summary>Closes the currently open document. The <c>spotfire.webPlayer.Application.onError</c> event will be raised if no document is opened, or the closing failed.</summary>
    window.removeEventListener("message", this._onMessageRef);
    this.analysisDocuments.forEach(function (doc)
    {
        doc.close();
    });
};

spotfire.webPlayer.Application.prototype.onOpened = function(callback)
{
    /// <summary>Event raised when the analysis has finished loading.</summary>
    /// <param name="callback" type="function">The event handler with the following signature: function(analysisDocument) {}.</param>

    this._onOpenedCallback = function (document) {
        document._setState(spotfire.webPlayer._idleState);
        callback.call(this, document);
    };
};

spotfire.webPlayer.Application.prototype.onClosed = function(callback)
{
    /// <summary>Event raised when the analysis has closed.</summary>
    /// <param name="callback" type="function">The event handler with the following signature: function(analysisPath, document) {}.</param>

    this._onClosedCallback = function (document)
    {
        callback.call(this, this._analysisPath, document);
    };
};

spotfire.webPlayer.Application.prototype.onError = function(callback)
{
    /// <summary>Event raised when an error occurs in the analysis or API.</summary>
    /// <param name="callback" type="function">The event handler with the following signature: function(errorCode, description) {}.</param>

    this._onErrorCallback = callback;
};

spotfire.webPlayer.Application.prototype.onLoggedOut = function (callback)
{
    /// <summary>Event raised when the user is logged out.</summary>
    /// <param name="callback" type="function">The event handler with the following signature: function() {}.</param>

    this._onLoggedOutCallback = function ()
    {
        callback.call(this);
        this._onLoggedOutCallback = function () { };
    };
};

// ******** Class: Document ***************************************************
spotfire.webPlayer.Document = function(application, elementId, customization, parameters, documentId, documentViewId)
{
    /// <summary>[internal constructor] Contains document related functionality. Created by the application when the analysis is loaded.</summary>
    /// <param name="application" type="spotfire.webPlayer.Application">The Web Player application object which opened the analysis.</param>
    /// <param name="analysisPath" type="string">The library path to the opened analysis.</param>
    /// <param name="customization" type="spotfire.webPlayer.Customization">Instance of the <c>spotfire.webPlayer.Customization</c> class. If null this will be inherited from the application instance.</param>
    /// <param name="parameters" type="string">Load parameters for the document. If null this will be inherited from the application instance.</param>
    /// <param name="documentId" type="string">If set, just refresh an existing web analysis.</param>
    /// <param name="documentViewId" type="string">If set, just refresh an existing web analysis.</param>
    /// <field name="marking" type="spotfire.webPlayer.Marking">Reference to the <c>spotfire.webPlayer.Marking</c> object.</field>
    /// <field name="filtering" type="spotfire.webPlayer.Filtering">Reference to the <c>spotfire.webPlayer.Filtering</c> object.</field>
    /// <field name="data" type="spotfire.webPlayer.Data">Reference to the <c>spotfire.webPlayer.Data</c> object.</field>
    /// <field name="elementId" type="String">The id of the DOM element where the document is loaded.</field>
    /// <field name="isLoaded" type="Boolean">Boolean indicating whether the document is loaded.</field>

    this.marking = new spotfire.webPlayer.Marking(this);
    this.filtering = new spotfire.webPlayer.Filtering(this);
    this.data = new spotfire.webPlayer.Data(this);

    this.elementId = elementId;
    this.isLoaded = false;
    this._application = application;
    this._customizationInfo = customization;
    this._parameters = parameters;
    this._documentId = documentId;
    this._documentViewId = documentViewId;
    this._apiCallbackList = [];
    this._apiRequestQueue = [];
    this._pendingApiRequests = [];
    this._onDocumentUpdatedCallbackList = [];
    this._reloading = false;
    this._document = this;
    this._requestTimeout = 120000;
};

spotfire.webPlayer.Document.prototype.setActivePage = function(pageIndexOrTitle)
{
    /// <summary>Change the active page by page title or page index. The <c>spotfire.webPlayer.Application.onError</c> event will be fired if the page index or page title does not exist.</summary>
    /// <param name="pageIndexOrTitle" type="object">Page index specified by an integer or page title specified by a string to the page to set active.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','setActivePage'], arguments);
};

spotfire.webPlayer.Document.prototype.applyBookmark = function(bookmarkName)
{
    /// <summary>NOTE: It is recommended to instead use applyBookmarkById() from API version 3.3 and forward.
    /// Applies a bookmark by its name. The <c>spotfire.webPlayer.Application.onError</c> event will be fired if the bookmarks does not exist or if several bookmark have the name.</summary>
    /// <param name="bookmarkName" type="string">The bookmark name.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','applyBookmark'], arguments);
};

spotfire.webPlayer.Document.prototype.onActivePageChanged = function(callback)
{
    /// <summary>Event raised when a page change occurs in the analysis.</summary>
    /// <param name="callback" type="function">The event handler with the following signature: function(pageState) {}.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','onActivePageChanged'], arguments);
};

spotfire.webPlayer.Document.prototype.onDocumentReady = function(callback)
{
    /// <summary>Event raised when the document switches to the ready state (the round icon in the status bar becomes green).</summary>
    /// <param name="callback" type="function">The event handler with the following signature: function() {}.</param>

    if (typeof callback === "function")
    {
        this._onDocumentUpdatedCallbackList.push(callback);
    }
    else
    {
        this._application._onErrorCallback(spotfire.webPlayer.errorCodes.ERRORDOCUMENT,
            "The provided callback is invalid.");
    }
};

spotfire.webPlayer.Document.prototype.applyBookmarkById = function(id)
{
    /// <summary>Applies a bookmark by its id. The <c>spotfire.webPlayer.Application.onError</c> event will be fired if the bookmarks does not exist.</summary>
    /// <param name="id" type="string">The bookmark id.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','applyBookmarkById'], arguments);
};

spotfire.webPlayer.Document.prototype.getBookmarks = function(callback)
{
    /// <summary>Get the bookmarks in the document.</summary>
    /// <param name="callback" type="function">The event handler with the following signature: function(bookmarksIds) {}. The parameter in the signature is an array of strings.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','getBookmarks'], arguments);
};

spotfire.webPlayer.Document.prototype.getDocumentMetadata = function(callback)
{
    /// <summary>Get the metadata for the document.</summary>
    /// <param name="callback" type="function">The event handler with the following signature: function(metadata) {}.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','getDocumentMetadata'], arguments);
};

spotfire.webPlayer.Document.prototype.getBookmarkNames = function(callback)
{
    /// <summary>Get the names of the bookmarks in the document.</summary>
    /// <param name="callback" type="function">The event handler with the following signature: function(bookmarkNames) {}. The parameter in the signature is an array of strings.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','getBookmarkNames'], arguments);
};

spotfire.webPlayer.Document.prototype.setDocumentProperty = function(propertyName, propertyValue)
{
    /// <summary>Set the value of a property.</summary>
    /// <param name="propertyName" type="string">The name of the property.</param>
    /// <param name="propertyValue" type="object">The value of the property.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','setDocumentProperty'], arguments);
};

spotfire.webPlayer.Document.prototype.getDocumentProperty = function(propertyName, callback)
{
    /// <summary>Get the information about the property with given name.</summary>
    /// <param name="propertyName" type="string">The name of the property.</param>
    /// <param name="callback" type="function">A callback function with the following signature: function(property) {}.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','getDocumentProperty'], arguments);
};

spotfire.webPlayer.Document.prototype.getDocumentProperties = function(callback)
{
    /// <summary>Get a list of all the properties in the document.</summary>
    /// <param name="callback" type="function">A callback function with the following signature: function(properties) {}. The parameter in the signature is an array of Property.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','getDocumentProperties'], arguments);
};

spotfire.webPlayer.Document.prototype.onDocumentPropertyChanged = function(propertyName, callback)
{
    /// <summary>Event raised when the given property has changed value.</summary>
    /// <param name="propertyName" type="string">The property to listen for changes.</param>
    /// <param name="callback" type="function">The event handler with the following signature: function(property) {}.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','onDocumentPropertyChanged'], arguments);
};

spotfire.webPlayer.Document.prototype.getActivePage = function(callback)
{
    /// <summary>Gets the active page.</summary>
    /// <param name="callback" type="function">A callback function with the following signature: function(page) {}.</param>

     this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','getActivePage'], arguments);
};

spotfire.webPlayer.Document.prototype.getPages = function(callback)
{
    /// <summary>Gets all pages in the opened analysis.</summary>
    /// <param name="callback" type="function">A callback function with the following signature; function(pages) {}. The parameter in the signature is an array of pages.</param>

     this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','getPages'], arguments);
};

spotfire.webPlayer.Document.prototype.exportToPdf = function ()
{
    /// <summary>Launch the export to Pdf dialog.</summary>
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','exportToPdf'], arguments);
};

spotfire.webPlayer.Document.prototype.exportToPowerPoint = function ()
{
    /// <summary>Launch the export to PowerPoint dialog.</summary>
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','exportToPowerPoint'], arguments);
};

spotfire.webPlayer.Document.prototype.exportActiveVisualAsImage = function (width, height)
{
    /// <summary>Export active visualization image.</summary>
    /// <param name="width" type="integer">Specify the image width (default = 800).</param>
    /// <param name="height" type="integer">Specify the image height (default = 600).</param>
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','exportActiveVisualAsImage'], arguments);
};

spotfire.webPlayer.Document.prototype.print = function ()
{
    /// <summary>Launch the print dialog.</summary>
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','print'], arguments);
};

spotfire.webPlayer.Document.prototype.executeCustomTool = function(fullToolName)
{
    /// <summary>Execute a custom tool.</summary>
    /// <param name="fullToolName" type="string">The full name of the tool to execute, including namespace (e.g. "MyCompany.Spotfire.CustomTools.MyTool").</param>
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','executeCustomTool'], arguments);
};

spotfire.webPlayer.Document.prototype.executeCustomExportTool = function(fullToolName)
{
    /// <summary>Execute a custom export tool.</summary>
    /// <param name="fullToolName" type="string">The full name of the export tool to execute, including namespace (e.g. "MyCompany.Spotfire.CustomExportTools.MyExportTool") to execute.</param>
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','executeCustomExportTool'], arguments);
};

spotfire.webPlayer.Document.prototype.logout = function (showConfirmation)
{
    /// <summary>Logout the user.</summary>
    /// <param name="showConfirmation" type="boolean">If <c>true</c>, a confirmation dialog will be presented to the user.</param>
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','logout'], arguments);
};

spotfire.webPlayer.Document.prototype.downloadAsDxp = function()
{
    /// <summary>Download the current document as Dxp file.</summary>
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','downloadAsDxp'], arguments);
};

spotfire.webPlayer.Document.prototype.close = function () {
    /// <summary>Closes the document. The <c>spotfire.webPlayer.Application.onError</c> event will be raised if the closing failed.</summary>
    var app = this._application;
    if (this._state === spotfire.webPlayer._idleState)
    {
        this.isLoaded = false;
        this._wpFrame.contentWindow.postMessage(JSON.stringify({ method: "closeAnalysis" }), app._webPlayerOrigin);
    }
    else
    {
        app._onErrorCallback(spotfire.webPlayer.errorCodes.ERRORCLOSE,
            "Document busy.");
    }
};

// ******** Class: Marking ****************************************************
spotfire.webPlayer.Marking = function(document)
{
    /// <summary>[internal constructor] Contains marking related functionality. This object is created when the analysis document is loaded.</summary>
    /// <param name="application" type="spotfire.webPlayer.Application">The Web Player application object which opened the analysis.</param>

    this._document = document;
};

spotfire.webPlayer.Marking.prototype.setMarking = function(markingName, dataTableName, whereClause, markingOperation)
{
    /// <summary>Sets a marking in the analysis specified by the input parameters.</summary>
    /// <param name="markingName" type="string">The marking name in which to set the marking.</param>
    /// <param name="tableName" type="string">The data table name in which to set the marking.</param>
    /// <param name="whereClause" type="string">A SQL syntaxed string with conditions for the columns used to set the marking. For more information, see XXX.</param>
    /// <param name="markingOperation" type="spotfire.webPlayer.MarkingOperation">A marking operation to use when setting the marking. The different options are explained in <c>spotfire.webPlayer.markingOperation</c>.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','markingProxy','setMarking'], arguments);
};

spotfire.webPlayer.Marking.prototype.onChanged = function(markingName, dataTableName, dataColumnNames, maxRows, callback, intersectionFilteringName)
{
    /// <summary>Event raised when a marking is changed in the analysis, conditioned by the input parameters.</summary>
    /// <param name="markingName" type="string">The marking name in which to listen for changes.</param>
    /// <param name="tableName" type="string">The data table name in which to listen for marking changes.</param>
    /// <param name="columnNames" parameterArray="true" elementType="string">Array of column names in which to listen for marking changes.</param>
    /// <param name="maxRows" type="Number" integer="true">The maximum number of marked rows to return.</param>
    /// <param name="callback" type="function">The event handler with the following signature: function(array) {}. The array has the following format: array["Column Name"][n], where n are the marked rows, numbered from [0, <= maxRows-1].</param>
    /// <param name="intersectionFilteringName" type="string">[optional] Only raise the event if marking changes occurs in the intersection between the displayed data from the filtering scheme and the displayed data from the marking parameters.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','markingProxy','onChanged'], arguments);
};

spotfire.webPlayer.Marking.prototype.getMarking = function(markingName, dataTableName, dataColumnNames, maxRows, callback)
{
    /// <summary>Gets data from a marking.</summary>
    /// <param name="markingName" type="string">Name of the marking.</param>
    /// <param name="dataTableName" type="string">Name of the data table for the columns.</param>
    /// <param name="dataColumnNames" parameterArray="true" elementType="string">Data columns to get marking data from.</param>
    /// <param name="maxRows" type="int">Maximum number of rows in the result.</param>
    /// <param name="callback" type="function">A callback function with the following signature: function(array) {}. array["Column Name"][n], where n is the data row index.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','markingProxy','getMarking'], arguments);
};

spotfire.webPlayer.Marking.prototype.getMarkingNames = function(callback)
{
    /// <summary>Gets all marking names from the opened analysis.</summary>
    /// <param name="callback" type="function">A callback function with the following signature: function(markingNames) {}. The parameter in the signature is an array of strings.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','markingProxy','getMarkingNames'], arguments);
};


// ******** Class: Filter *****************************************************
spotfire.webPlayer.Filtering = function(document)
{
    /// <summary>[internal constructor] Contains filtering related functionality. This object is created when the document is loaded.</summary>
    /// <param name="application" type="spotfire.webPlayer.Application">The Web Player application object which opened the analysis.</param>

    this._document = document;
};
spotfire.webPlayer.Filtering.prototype.setFilter = function(filterColumn, filteringOperation)
{
    /// <summary>Changes the value(s) of a filter.</summary>
    /// <param name="filterColumn" type="spotfire.webPlayer.FilterColumn">An instance to a FilterColumn object.</param>
    /// <param name="filteringOperation" type="string">THe filtering operation to use.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','filteringProxy','setFilter_31'], arguments);

};
spotfire.webPlayer.Filtering.prototype.resetAllFilters = function()
{
    /// <summary>Resets all filters to their initial values.</summary>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','filteringProxy','resetAllFilters'], arguments);
};
spotfire.webPlayer.Filtering.prototype.resetAllFiltersOnActivePage = function()
{
    /// <summary>Resets all filters on active page to their initial values.</summary>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','filteringProxy','resetAllFiltersOnActivePage'], arguments);
};
spotfire.webPlayer.Filtering.prototype.getFilterColumn = function(filteringSchemeName, dataTableName, columnName, includedFilterSettings, callback)
{
    /// <summary>Gets information about a filter column.</summary>
    /// <param name="filteringSchemeName" type="string">The filtering scheme name.</param>
    /// <param name="dataTableName" type="string">The data table name.</param>
    /// <param name="columnName" type="string">The data column name.</param>
    /// <param name="callback" type="function">A callback function with the following signature: function(filterColumn) {}. The first parameter in the signature is an instance of the spotfire.webPlayer.FilterColumn class.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','filteringProxy','getFilterColumn'], arguments);
};

spotfire.webPlayer.Filtering.prototype.getActiveFilteringScheme = function(callback)
{
    /// <summary>Gets the active filtering scheme.</summary>
    /// <param name="callback" type="function">A callback function with the following signature: function(filteringScheme) {}. The first parameter in the signature is an instance of the spotfire.webPlayer.Filtering.FilteringScheme class.</param>

     this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','filteringProxy','getActiveFilteringScheme'], arguments);
};

spotfire.webPlayer.Filtering.prototype.getFilteringScheme = function(filteringSchemeName, callback)
{
    /// <summary>Gets a specific filtering scheme.</summary>
    /// <param name="filteringSchemeName" type="string">The filtering scheme name.</param>
    /// <param name="callback" type="function">A callback function with the following signature: function(filteringScheme) {}. The first parameter in the signature is an instance of the spotfire.webPlayer.Filtering.FilteringScheme class.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','filteringProxy','getFilteringScheme'], arguments);
};

spotfire.webPlayer.Filtering.prototype.getFilteringSchemes = function(callback)
{
    /// <summary>Gets all filtering schemes.</summary>
    /// <param name="callback" type="function">A callback function with the following signature: function(filteringSchemes) {}. The first parameter in the signature is an array of spotfire.webPlayer.Filtering.FilteringScheme instances.</param>

     this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','filteringProxy','getFilteringSchemes'], arguments);
};

spotfire.webPlayer.Filtering.prototype.setFilters = function(filterColumns, filteringOperation)
{
    /// <summary>Changes the value(s) of multiple filter columns.</summary>
    /// <param name="filteringSchemeName" type="string">The filtering scheme name.</param>
    /// <param name="filterColumns" parameterArray="true" elementType="spotfire.webPlayer.FilterColumn">An array of FilterColumn objects.</param>
    /// <param name="filteringOperation" type="string">The filtering operation to use.</param>

     this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','filteringProxy','setFilters'], arguments);
};

spotfire.webPlayer.Filtering.prototype.getAllModifiedFilterColumns = function(includedFilterSettings, callback)
{
    /// <summary>Gets all modified filter columns in all schemes.</summary>
    /// <param name="includedFilterSettings" type="spotfire.webPlayer.includedFilterSettings">Specify how filter settings should be included in the result.</param>
    /// <param name="callback" type="function">A callback function with the following signature: function(filterColumns) {}. The first parameter in the signature is an array of spotfire.webPlayer.FilterColumn instances.</param>

     this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','filteringProxy','getAllModifiedFilterColumns'], arguments);
};

spotfire.webPlayer.Filtering.prototype.getModifiedFilterColumns = function(filteringSchemeName, includedFilterSettings, callback)
{
    /// <summary>Gets all modified filter columns in a scheme.</summary>
    /// <param name="filteringSchemeName" type="string">The filtering scheme name.</param>
    /// <param name="includedFilterSettings" type="spotfire.webPlayer.includedFilterSettings">Specify how filter settings should be included in the result.</param>
    /// <param name="callback" type="function">A callback function with the following signature: function(filterColumns) {}. The first parameter in the signature is an array of spotfire.webPlayer.FilterColumn instances.</param>

     this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','filteringProxy','getModifiedFilterColumns'], arguments);
};

spotfire.webPlayer.Filtering.FilteringScheme = function(filteringSchemeName, dataTableNames)
{
    /// <summary>[internal constructor] Creates a filtering scheme object.</summary>
    /// <param name="filteringSchemeName" type="string">The filtering scheme name.</param>
    /// <param name="dataTableNames" parameterArray="true" elementType="spotfire.webPlayer.Data.DataTable">An array of DataTable objects.</param>

    this._document = spotfire.webPlayer.Document._current;
    this.filteringSchemeName = filteringSchemeName;
    this.dataTableNames = dataTableNames;
};

spotfire.webPlayer.Filtering.FilteringScheme.prototype.getFilterColumn = function(dataTableName, filterColumnName, includedFilterSettings, callback)
{
    /// <summary>Gets a specific filter column.</summary>
    /// <param name="dataTableName" type="string">The data table name.</param>
    /// <param name="columnName" type="string">The data column name.</param>
    /// <param name="includedFilterSettings" type="spotfire.webPlayer.includedFilterSettings">Specify how filter settings should be included in the result.</param>
    /// <param name="callback" type="function">A callback function with the following signature: function(filterColumn) {}. The first parameter in the signature is an instance of the spotfire.webPlayer.FilterColumn class.</param>

    _arguments = [];
    _arguments[0] = this.filteringSchemeName;
    _arguments[1] = dataTableName;
    _arguments[2] = filterColumnName;
    _arguments[3] = includedFilterSettings;
    _arguments[4] = callback;
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','filteringSchemeProxy','getFilterColumn'], _arguments);
};

spotfire.webPlayer.Filtering.FilteringScheme.prototype.getFilterColumns = function(dataTableName, includedFilterSettings, callback)
{
    /// <summary>Gets all filter columns.</summary>
    /// <param name="dataTableName" type="string">The data table name.</param>
    /// <param name="includedFilterSettings" type="spotfire.webPlayer.includedFilterSettings">Specify how filter settings should be included in the result.</param>
    /// <param name="callback" type="function">A callback function with the following signature: function(filterColumns) {}. The first parameter in the signature is an array of spotfire.webPlayer.FilterColumn instances.</param>

    _arguments = [];
    _arguments[0] = this.filteringSchemeName;
    _arguments[1] = dataTableName;
    _arguments[2] = includedFilterSettings;
    _arguments[3] = callback;
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','filteringSchemeProxy','getFilterColumns'], _arguments);
};

spotfire.webPlayer.Filtering.FilteringScheme.prototype.getDefaultFilterColumns = function(includedFilterSettings, callback)
{
    /// <summary>Gets all modified filter columns.</summary>
    /// <param name="includedFilterSettings" type="spotfire.webPlayer.includedFilterSettings">Specify how filter settings should be included in the result.</param>
    /// <param name="callback" type="function">A callback function with the following signature: function(filterColumns) {}. The first parameter in the signature is an array of spotfire.webPlayer.FilterColumn instances.</param>

    _arguments = [];
    _arguments[0] = this.filteringSchemeName;
    _arguments[1] = includedFilterSettings;
    _arguments[2] = callback;
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','filteringSchemeProxy','getDefaultFilterColumns'], _arguments);
};


// ******** Class: Data *******************************************************
spotfire.webPlayer.Data = function(document)
{
    /// <summary>[internal constructor] Contains data related functionality. This object is created when the document is loaded.</summary>
    /// <param name="application" type="spotfire.webPlayer.Application">The Web Player application object which opened the analysis.</param>

    this._document = document;
};

spotfire.webPlayer.Data.prototype.onRangeChanged = function(filteringSchemeName, dataTableName, dataColumnName, callback)
{
    /// <summary>Event raised when filtered range in a data column is changed. Note that the event will raise when the filtered data changes, and the callback will only specify the range of the filtered column. The event will always return [null, null] as range for Hierarchy Filters.</summary>
    /// <param name="filteringName" type="string">The name of the filtering schema in which to listen for filtering changes.</param>
    /// <param name="tableName" type="string">The data table name in which to listen for filtering changes.</param>
    /// <param name="columnName" type="string">The name of the filtering column in which to listen for filtering changes.</param>
    /// <param name="callback" type="function">The event handler with the following signature: function(filterState) {}.</param>

    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','dataProxy','onRangeChanged'], _arguments);
};

spotfire.webPlayer.Data.prototype.getDataTable = function(dataTableName, callback)
{
    /// <summary>Gets a specific data table.</summary>
    /// <param name="dataTableName" type="string">The data table name.</param>
    /// <param name="callback" type="function">A callback function with the following signature: function(dataTable) {}. The first parameter in the signature is an instance of the spotfire.webPlayer.Data.DataTable class.</param>

     this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','dataProxy','getDataTable'], _arguments);
};

spotfire.webPlayer.Data.prototype.getDataTables = function(callback)
{
    /// <summary>Gets all tables.</summary>
    /// <param name="callback" type="function">A callback function with the following signature: function(dataTables) {}. The first parameter in the signature is an array of spotfire.webPlayer.Data.DataTable instances.</param>

     this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','dataProxy','getDataTables'], _arguments);
};

spotfire.webPlayer.Data.prototype.getActiveDataTable = function(callback)
{
    /// <summary>Gets the active data table.</summary>
    /// <param name="callback" type="function">A callback function with the following signature: function(dataTable) {}. The first parameter in the signature is an instance of the spotfire.webPlayer.Data.DataTable class.</param>

     this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','dataProxy','getActiveDataTable'], _arguments);
};

spotfire.webPlayer.Data.DataTable = function(dataTableName)
{
    /// <summary>[internal constructor] Creates a data table object.</summary>
    /// <param name="dataTableName" type="string">Data table name.</param>

    this._document = spotfire.webPlayer.Document._current;
    this.dataTableName = dataTableName;
};

spotfire.webPlayer.Data.DataTable.prototype.getDataColumn = function(dataColumnName, callback)
{
    /// <summary>Gets a specific data column.</summary>
    /// <param name="dataColumnName" type="string">The data column name.</param>
    /// <param name="callback" type="function">A callback function with the following signature: function(dataColumn) {}. The first parameter in the signature is an instance of the spotfire.webPlayer.Data.DataColumn class.</param>

    _arguments = [];
    _arguments[0] = this.dataTableName;
    _arguments[1] = dataColumnName;
    _arguments[2] = callback;
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','dataTableProxy','getDataColumn'], _arguments);
};

spotfire.webPlayer.Data.DataTable.prototype.getDataColumns = function(callback)
{
    /// <summary>Gets all data columns.</summary>
    /// <param name="callback" type="function">A callback function with the following signature: function(dataColumns) {}. The first parameter in the signature is an array of spotfire.webPlayer.Data.DataColumn instances.</param>

    _arguments = [];
    _arguments[0] = this.dataTableName;
    _arguments[1] = callback;
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','dataTableProxy','getDataColumns'], _arguments);
};

spotfire.webPlayer.Data.DataTable.prototype.searchDataColumns = function(searchExpression, callback)
{
    /// <summary>Searches for data columns given a search expression.</summary>
    /// <param name="searchExpression" type="string">Search expression.</param>
    /// <param name="callback" type="function">A callback function with the following signature: function(dataColumns) {}. The first parameter in the signature is an array of spotfire.webPlayer.Data.DataColumn instances.</param>

    _arguments = [];
    _arguments[0] = this.dataTableName;
    _arguments[1] = searchExpression;
    _arguments[2] = callback;
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','dataTableProxy','searchDataColumns'], _arguments);
};

spotfire.webPlayer.Data.DataTable.prototype.getDataTableProperties = function(callback)
{
    /// <summary>Get a list of all the properties to the data table.</summary>
    /// <param name="callback" type="function">A callback function with the following signature: function(properties) {}. The parameter in the signature is an array of spotfire.webPlayer.Property.</param>

    _arguments = [];
    _arguments[0] = this.dataTableName;
    _arguments[1] = callback;
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','dataTableProxy','getDataTableProperties'], _arguments);
};

spotfire.webPlayer.Data.DataTable.prototype.getDataTableProperty = function(propertyName, callback)
{
    /// <summary>Gets information about a specific data table property.</summary>
    /// <param name="propertyName" type="string">Property name.</param>
    /// <param name="callback" type="function">A callback function with the following signature: function(property) {}.</param>

    _arguments = [];
    _arguments[0] = this.dataTableName;
    _arguments[1] = propertyName;
    _arguments[2] = callback;
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','dataTableProxy','getDataTableProperty'], _arguments);
};

spotfire.webPlayer.Data.DataTable.prototype.setDataTableProperty = function(propertyName, propertyValue)
{
    /// <summary>Sets the value of a property.</summary>
    /// <param name="propertyName" type="string">The name of the property.</param>
    /// <param name="propertyValue" type="object">The value of the property.</param>

    _arguments = [];
    _arguments[0] = this.dataTableName;
    _arguments[1] = propertyName;
    _arguments[2] = propertyValue;
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','dataTableProxy','setDataTableProperty'], _arguments);
};

spotfire.webPlayer.Data.DataTable.prototype.onDataTablePropertyChanged = function(propertyName, callback)
{
    /// <summary>Event raised when the given property changes value.</summary>
    /// <param name="propertyName" type="string">The property to listen for changes.</param>
    /// <param name="callback" type="function">The event handler with the following signature: function(property) {}.</param>

    _arguments = [];
    _arguments[0] = this.dataTableName;
    _arguments[1] = propertyName;
    _arguments[2] = callback;
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','dataTableProxy','onDataTablePropertyChanged'], _arguments);
};

spotfire.webPlayer.Data.DataColumn = function(dataTableName, dataColumnName, dataType)
{
    /// <summary>[internal constructor] Creates a data column object.</summary>
    /// <param name="dataTableName" type="string">Data table name.</param>
    /// <param name="dataColumnName" type="string">Data column name.</param>
    /// <param name="dataType" type="spotfire.webPlayer.columnDataType">Data type.</param>

    this._document = spotfire.webPlayer.Document._current;
    this.dataTableName = dataTableName;
    this.dataColumnName = dataColumnName;
    this.dataType = dataType;
};

spotfire.webPlayer.Data.DataColumn.prototype.getDataColumnProperties = function(callback)
{
    /// <summary>Get a list of all the properties to the data column.</summary>
    /// <param name="callback" type="function">A callback function with the following signature: function(properties) {}. The parameter in the signature is an array of spotfire.webPlayer.Property.</param>

    _arguments = [];
    _arguments[0] = this.dataTableName;
    _arguments[1] = this.dataColumnName;
    _arguments[2] = callback;
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','dataColumnProxy','getDataColumnProperties'], _arguments);
};

spotfire.webPlayer.Data.DataColumn.prototype.getDataColumnProperty = function(propertyName, callback)
{
    /// <summary>Gets information about a specific data column property.</summary>
    /// <param name="propertyName" type="string">Property name.</param>
    /// <param name="callback" type="function">A callback function with the following signature: function(property) {}.</param>

    _arguments = [];
    _arguments[0] = this.dataTableName;
    _arguments[1] = this.dataColumnName;
    _arguments[2] = propertyName;
    _arguments[3] = callback;
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','dataColumnProxy','getDataColumnProperty'], _arguments);
};

spotfire.webPlayer.Data.DataColumn.prototype.setDataColumnProperty = function(propertyName, propertyValue)
{
    /// <summary>Sets the value of a property.</summary>
    /// <param name="propertyName" type="string">The name of the property.</param>
    /// <param name="propertyValue" type="object">The value of the property.</param>

    _arguments = [];
    _arguments[0] = this.dataTableName;
    _arguments[1] = this.dataColumnName;
    _arguments[2] = propertyName;
    _arguments[3] = propertyValue;
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','dataColumnProxy','setDataColumnProperty'], _arguments);
};

spotfire.webPlayer.Data.DataColumn.prototype.onDataColumnPropertyChanged = function(propertyName, callback)
{
    /// <summary>Event raised when the given property changes value.</summary>
    /// <param name="propertyName" type="string">The property to listen for changes.</param>
    /// <param name="callback" type="function">The event handler with the following signature: function(property) {}.</param>

    _arguments = [];
    _arguments[0] = this.dataTableName;
    _arguments[1] = this.dataColumnName;
    _arguments[2] = propertyName;
    _arguments[3] = callback;
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','dataColumnProxy','onDataColumnPropertyChanged'], _arguments);
};
spotfire.webPlayer.Data.DataColumn.prototype.getDistinctValues = function (startIndex, responseLimit, callback) {
    /// <summary>Get a list of the unique values in the data column. For performance reasons the response is paged.</summary>
    /// <param name="startIndex" type="integer">The zero-based start index of the distinct values.</param>
    /// <param name="responseLimit" type="integer">Limit the response to this number of values.</param>
    /// <param name="callback" type="function">A callback function with the following signature: function(result) {}.</param>

    _arguments = [];
    _arguments[0] = this.dataTableName;
    _arguments[1] = this.dataColumnName;
    _arguments[2] = startIndex;
    _arguments[3] = responseLimit;
    _arguments[4] = callback;
    this._document._executeApiMethod(['webPlayerProxy','analysisDocumentProxy','dataColumnProxy','getDataColumnDistinctValues'], _arguments);
};

//
// State Classes
//

// ******** Class: PageState **************************************************
spotfire.webPlayer.PageState = function(index, pageTitle)
{
    /// <summary>[internal constructor] The state of the active page after a page change has occurred.</summary>
    /// <param name="index" type="Number" integer="true">The index of the new active page.</param>
    /// <param name="pageTitle" type="string">The title of the new active page.</param>

    /// <field name="index" type="Number" integer="true">The index of the new active page.</field>
    /// <field name="pageTitle" type="string">The title of the new active page.</field>

    this.index = index;
    this.pageTitle = pageTitle;
};

// ******** Class: DataColumnRangeState ***************************************
spotfire.webPlayer.DataColumnRangeState = function(filteringName, tableName, columnName, lowValue, highValue)
{
    /// <summary>[internal constructor] The state of the data column after a filtering has occurred.</summary>
    /// <param name="filteringName" type="string">The name of the filtering schema where the filter is located.</param>
    /// <param name="tableName" type="string">The data table name in which the filter is located.</param>
    /// <param name="columnName" type="string">The name of the filtering column.</param>
    /// <param name="lowValue" type="string">The lowest value in the filtered range.</param>
    /// <param name="highValue" type="string">The highest value in the filtered range.</param>

    /// <field name="filteringName" type="string">The name of the filtering schema where the filter is located.</field>
    /// <field name="tableName" type="string">The data table name in which the filter is located.</field>
    /// <field name="columnName" type="string">The name of the filtering column.</field>
    /// <field name="lowValue" type="string">The lowest value in the filtered range.</field>
    /// <field name="highValue" type="string">The highest value in the filtered range.</field>

    this.filteringName = filteringSchemeName;
    this.tableName = tableName;
    this.columnName = columnName;
    this.lowValue = lowValue;
    this.highValue = highValue;
};


// ******** Class: FilterSettings *********************************************
spotfire.webPlayer.FilterSettings = function()
{
    /// <summary>Used to configure how a filter should be set.</summary>
    /// <field name="values" parameterArray="true" elementType="object">The values to set in a filter. See the <c>spotfire.webPlayer.Filtering</c> class for how the options are used with the different filters.</field>
    /// <field name="path" parameterArray="true" elementType="string">The path in a CheckBox Hierarchy Filter.</field>
    /// <field name="lowValue" type="string">The low value of the range filter.</field>
    /// <field name="highValue" type="string">The high value of the range filter.</field>
    /// <field name="includeEmpty" type="Boolean">Specifies if empty values should be included in the filtering.</field>
    /// <field name="operation" type="spotfire.webPlayer.filteringOperation">Specifies how the filtering values will be applied.</field>
    /// <field name="searchPattern" type="string">Specifies search pattern for Text Filters and List Box Filter.</field>

    this.values	= [];
    this.lowValue = null;
    this.highValue = null;
    this.includeEmpty = null;
    this.searchPattern = null;
    this.hierarchyPath = null;
};

// ******** Class: WebBookmark **************************************************
spotfire.webPlayer.WebBookmark = function(id, name, author, modified, visibility, webplayerurl, webplayerredirecturl)
{
    /// <param name="id" type="string">The id.</param>
    /// <param name="name" type="string">The name.</param>
    /// <param name="author" type="string">The author.</param>
    /// <param name="modified" type="string">The date when the bookmark was modified.</param>
    /// <param name="visibility" type="string">If set to <c>true</c>, visibility is public.</param>
    /// <param name="webplayerurl" type="string">The web player URL.</param>
    /// <param name="webplayerredirecturl" type="string">The web player redirect URL.</param>

    /// <field name="id" type="string">The id.</field>
    /// <field name="name" type="string">The name.</field>
    /// <field name="author" type="string">The author.</field>
    /// <field name="modified" type="string">The date when the bookmark was modified.</field>
    /// <field name="visibility" type="string">If set to <c>true</c>, visibility is public.</field>
    /// <field name="webplayerurl" type="string">The web player URL.</field>
    /// <field name="webplayerredirecturl" type="string">The web player redirect URL.</field>

    this.id = id;
    this.name = name;
    this.author = author;
    this.modified = modified;
    this.visibility = visibility;
    this.webplayerurl = webplayerurl;
    this.webplayerredirecturl = webplayerredirecturl;
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//
// Document Client Side Implementation
//

spotfire.webPlayer.Document.prototype._loadPendingDocuments = function()
{
    if (this.isLoaded)
    {
        var spawn;
        var doc = this._application._pendingOpenViews.shift();

        while (doc)
        {
            if (doc._documentId && doc._documentViewId)
            {
                spawn = false;
            }
            else
            {
                spawn = true;
                doc._documentId = this._documentId;
                doc._documentViewId = this._documentViewId;
            }

            doc._loadProxyAndExecute(spawn, function(spawnedDoc)
            {
                var app = spawnedDoc._application;
                app._onOpenedCallback.call(app, spawnedDoc);
            });

            doc = this._application._pendingOpenViews.shift();
        }
    }
};

spotfire.webPlayer.Document.prototype._loadProxyAndExecute = function (spawnView, onReadyCallback)
{
    var app = this._application;

    if (typeof onReadyCallback === "function")
    {
        this._onReadyCallback = onReadyCallback;
    }

    if (typeof spawnView === "boolean")
    {
        this._spawnView = spawnView;
    }

    this._deleteIFrames();

    var openProxyFrame = document.createElement("iframe");
    openProxyFrame.id = "openProxyFrame_" + this.elementId;

    openProxyFrame.style.border = "0px";
    openProxyFrame.style.width = "0px";
    openProxyFrame.style.height = "0px";
    openProxyFrame.style.display = "none";
    openProxyFrame.style.visibility = "hidden";
    openProxyFrame.frameBorder = 0;

    this._timeoutTimer = window.setTimeout(function()
    {
        openProxyFrame.style.width = "400px";
        openProxyFrame.style.height = "300px";
        app._onErrorCallback(spotfire.webPlayer.errorCodes.ERROROPEN,
            "Couldn't create the API proxy. Make sure that web application URL '" + app._webPlayerServerRootUrl + "' is correct.");
    }, app._openProxyTimeout);

    var data = {
        method: "open",
        rootUrl: app._webPlayerServerRootUrl,
        analysisPath: app._analysisPath,
        parameters: this._parameters,
        customization: this._customizationInfo,
        documentId: this._documentId,
        documentViewId: this._documentViewId,
        spawnView: this._spawnView,
        domain: document.domain
    }

    this.proxyWindowLoaded = function(proxyWindow)
    {
        window.clearTimeout(this._timeoutTimer);
        proxyWindow.postMessage(JSON.stringify(data), app._webPlayerOrigin);
    };

    var src = app._webPlayerServerRootUrl + "render/ivo3QBDZbtiEgIEf5Z/OpenProxy.aspx";

    openProxyFrame.src = src;
    document.body.appendChild(openProxyFrame);
    openProxyFrame.contentWindow.location.href = openProxyFrame.src;

    this._openProxyFrame = openProxyFrame;

    var parseMessageOrigin = function (url)
    {
        /*jslint regexp: true */
        var patIPv4 = /^(https?:\/\/)(?:[a-zA-Z0-9\-.]+@[a-zA-Z0-9\-.]+:)?([a-zA-Z0-9\-.]+)(:[0-9]+)?(.*)$/i;
        var patIPv6 = /^(https?:\/\/)(?:[a-zA-Z0-9\-.]+@[a-zA-Z0-9\-.]+:)?(\[[a-zA-Z0-9:]+\])(:[0-9]+)?(.*)$/i;
        /*jslint regexp: false */

        var res = patIPv6.exec(url) || patIPv4.exec(url);

        if (res)
        {
            var protocol = res[1];
            var address = res[2];
            var port = res[3] || "";

            if ((protocol === "http://" && port === ":80") ||
                (protocol === "https://" && port === ":443"))
            {
                return protocol + address;
            }

            return protocol + address + port;
        }

        return null;
    };

    if (!app._webPlayerOrigin)
    {
        app._webPlayerOrigin = parseMessageOrigin(openProxyFrame.src) || window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
    }
};

//
// Application Client Side Implementation
//
spotfire.webPlayer.Application.prototype._onOpenedCallback = function (doc) { doc._setState(spotfire.webPlayer._idleState) };
spotfire.webPlayer.Application.prototype._onClosedCallback = function() {};
spotfire.webPlayer.Application.prototype._onErrorCallback = function() {};
spotfire.webPlayer.Application.prototype._onLoggedOutCallback = function () { };

spotfire.webPlayer.Application.prototype._onMessage = function(event)
{
    var i;
    var doc = null;
    for (i = 0; i < this.analysisDocuments.length; i++)
    {
        var wpWindow = this.analysisDocuments[i]._wpFrame ? this.analysisDocuments[i]._wpFrame.contentWindow : null;
        var proxyWindow = this.analysisDocuments[i]._openProxyFrame ? this.analysisDocuments[i]._openProxyFrame.contentWindow : null;
        if (event.source === wpWindow || event.source === proxyWindow)
        {
            doc = this.analysisDocuments[i];
            break;
        }
    }

    if (!doc)
    {
        // Message does not originate from this application. Disregard message silently.
        return;
    }
    else if (this._webPlayerOrigin !== event.origin)
    {
        // The origin does not match the origin from where Spotfire instance was loaded. Throw error.
        this._onErrorCallback(spotfire.webPlayer.errorCodes.ERRORINTERNAL,
            "Disregading message from an unknown source. Expected source is '" + this._webPlayerOrigin + "', was '" + event.origin + "'.");
        return;
    }

    var data = JSON.parse(event.data);

    if (data.method === "proxyWindowLoaded")
    {
        doc.proxyWindowLoaded(event.source);
        return;
    }

    if (data.method === "documentLoaded")
    {
        doc._deleteIFrames();

        if (this._documentId && this._documentId !== data.documentId)
        {
            this._onErrorCallback(spotfire.webPlayer.errorCodes.ERRORINTERNAL,
                "Invalid DocumentId.");
            return;
        }

        this._documentId = data.documentId;
        doc._documentId = data.documentId;
        doc._documentViewId = data.documentViewId;

        var wpElement = document.getElementById(doc.elementId);
        var wpFrame = document.createElement("iframe");

        wpFrame.style.border = "0px";
        wpFrame.style.margin = "0px";
        wpFrame.style.padding = "0px";
        wpFrame.style.width = "100%";
        wpFrame.style.height = "100%";
        wpFrame.frameBorder = 0;
        wpFrame.src = data.uri;

        while (wpElement.hasChildNodes())
        {
            wpElement.removeChild(wpElement.lastChild);
        }

        wpElement.appendChild(wpFrame);
        doc._wpFrame = wpFrame;
        return;
    }

    if (data.method === "documentUpdated")
    {
        for (i = 0; i < doc._onDocumentUpdatedCallbackList.length; i++)
        {
            doc._onDocumentUpdatedCallbackList[i].call(doc);
        }

        return;
    }

    if (data.method === "analysisLoaded")
    {
        if (doc._documentId !== data.documentId || doc._documentViewId !== data.documentViewId)
        {
            // Document identfiers was changed, probably due to duplicated view id.
            this._onErrorCallback(spotfire.webPlayer.errorCodes.ERRORINTERNAL,
                "Could not create a unique document.");
            return;
        }

        doc.isLoaded = true;
        doc._reloading = false;
        doc._loadPendingDocuments();
        if (doc._onReadyCallback)
        {
            doc._onReadyCallback.call(this, doc);
        }

        doc._processApiQueue.call(doc);

        return;
    }

    if (data.method === "apiResult")
    {
        doc._runApiCallback(data.id, data.args, data.eval);
        return;
    }
    if (data.method === "apiRequestReceipt")
    {
        window.clearTimeout(data.requestId);
    }

    if (data.method === "openFailed")
    {
        if (doc._reloading)
        {
            doc._documentId = null;
            doc._documentViewId = null;
            doc._reloading = false;

            if (doc === this.analysisDocument)
            {
                doc._loadProxyAndExecute(false);
            }
            else
            {
                this._pendingOpenViews.push(doc);
                this.analysisDocument._loadPendingDocuments();
            }

            return;
        }

        doc._setState(spotfire.webPlayer._idleState);
        this._onErrorCallback(spotfire.webPlayer.errorCodes.ERROROPEN, data.error);
        return;
    }

    if (data.method === "analysisClosed")
    {
        doc.isLoaded = false;

        if (data.closedReason === "ScheduledUpdates")
        {
            if (doc._apiCallbackList.length > 0)
            {
                doc._apiCallbackList = [];
                this._onErrorCallback(spotfire.webPlayer.errorCodes.ERRORCALLBACKS,
                    "The analysis is reloading (reason: " + data.closedReason + "). There were registered callbacks that needs to be re-added.");
            }
        }
        else if (data.closedReason === "DifferentServer" ||
            data.closedReason === "Restart" ||
            data.closedReason === "Stale")
        {
            this._documentId = null;
            var hascallbacks = false;
            this.analysisDocuments.forEach(
                function (currentDoc)
                {
                    hascallbacks = hascallbacks || currentDoc._apiCallbackList.length > 0;
                    currentDoc.isLoaded = false;
                    currentDoc._deleteIFrames();
                    currentDoc._apiCallbackList = [];
                    currentDoc._documentId = null;
                    currentDoc._documentViewId = null;
                });

            this._pendingOpenViews = this.analysisDocuments.slice(1);
            this.analysisDocuments[0]._loadProxyAndExecute(false);

            if (hascallbacks > 0)
            {
                this._onErrorCallback(spotfire.webPlayer.errorCodes.ERRORCALLBACKS,
                    "The analysis is reloading (reason: " + data.closedReason + "). There were registered callbacks that needs to be re-added.");
            }
        }
        else
        {
            doc._setState(spotfire.webPlayer._idleState);
            var index = this.analysisDocuments.indexOf(doc);
            if (index >= 0)
            {
                this.analysisDocuments.splice(index, 1);
            }

            var hasLoadedDocuments = false;
            for (index = 0 ; index < this.analysisDocuments.length ; index++)
            {
                hasLoadedDocuments = hasLoadedDocuments || this.analysisDocuments[index].isLoaded;
            }

            if (!hasLoadedDocuments)
            {
                this._documentId = null;
            }

            if (this.analysisDocument === doc)
            {
                this.analysisDocument = this.analysisDocuments.length > 0 ? this.analysisDocuments[0] : null;
                this._document = this.analysisDocument;

                if (this.analysisDocument)
                {
                    if (this.analysisDocument.isLoaded)
                    {
                        this.analysisDocument._loadPendingDocuments();
                    }
                    else
                    {
                        index = this._pendingOpenViews.indexOf(this.analysisDocument);
                        if (index >= 0)
                        {
                            this._pendingOpenViews.splice(index, 1);
                        }

                        this.analysisDocument._loadProxyAndExecute(false, this._onOpenedCallback);
                    }
                }
            }

            this._onClosedCallback(doc);
        }

        return;
    }

    if (data.method === "userLoggedOut")
    {
        this._onLoggedOutCallback();
        return;
    }

    if (data.method === "ajaxError")
    {
        this._onErrorCallback(spotfire.webPlayer.errorCodes.ERRORINTERNAL,
            data.message + "\n" + data.details);
        return;
    }

    if (data.method === "apiError")
    {
        this._onErrorCallback(data.code || spotfire.webPlayer.errorCodes.ERRORINTERNAL,
            data.message);
        return;
    }
};

spotfire.webPlayer.Application.prototype._init = function()
{
    var app = this;
    this._onMessageRef = function(event)
    {
        app._onMessage.call(app, event);
    };

    window.addEventListener("message", this._onMessageRef);

    if (app._reloadInstances)
    {
        window.addEventListener("beforeunload", function()
        {
            // Save internal id to allow mashup to reload same server instances of the analysis.
            var doc, i;
            for (i = 0; i < app.analysisDocuments.length; i++)
            {
                doc = app.analysisDocuments[i];
                if (doc.isLoaded)
                {
                    try
                    {
                        window.sessionStorage.setItem("DocumentId:" + app._analysisPath + "/" + doc.elementId, doc._documentId);
                        window.sessionStorage.setItem("DocumentViewId:" + app._analysisPath + "/" + doc.elementId, doc._documentViewId);
                    }
                    catch (ignore)
                    {
                        // Local storage throws 'QUOTA_EXCEEDED_ERR' on Safari in private/incognito browsing mode.
                    }
                }
            }
        });
    }
};

spotfire.webPlayer.Document.prototype._serialize = function(args)
{
    var list = [];
    for (var i = 0; i < args.length; i++)
    {
        if (typeof args[i] === "function")
        {
            list[i] = this._registerCallback(args[i]);
        }
        else
        {
            list[i] = args[i];
        }
    }
    return JSON.stringify(list);
};

spotfire.webPlayer.Document.prototype._runApiCallback = function(id, args, evaluate)
{
    if (typeof this._apiCallbackList[id] === "function")
    {
        if (evaluate)
        {
            spotfire.webPlayer.Document._current = this;
            var apiObject = eval(args);
            spotfire.webPlayer.Document._current = null;
            this._apiCallbackList[id](apiObject);
        }
        else
        {
            this._apiCallbackList[id](JSON.parse(args));
        }
    }
    else
    {
        this._application._onErrorCallback(spotfire.webPlayer.errorCodes.ERRORINTERNAL,
            "The registered callback '" + id + "' seems to be an invalid JavaScript function.");
    }
};

spotfire.webPlayer.Document.prototype._registerCallback = function(callback)
{
    var index = this._apiCallbackList.length;
    this._apiCallbackList[index] = callback;
    return index;
};

spotfire.webPlayer.Document.prototype._executeApiMethod = function(path, params)
{
    var data =
    {
        method: "ExecuteApiMethod",
        path: path,
        args: this._serialize(params)
    };

    this._apiRequestQueue.push(data);
    this._processApiQueue();
};

spotfire.webPlayer.Document.prototype._processApiQueue = function()
{
    if (!this.isLoaded || !this._wpFrame || !this._wpFrame.contentWindow)
    {
        return;
    }

    var getOnTimeoutCallback = function (app, path)
    {
        return function()
        {
            app._onErrorCallback(
                spotfire.webPlayer.errorCodes.ERRORINTERNAL,
                "The server did not respond to request '" + path[path.length - 1] + "' in a timely fashion.");
        }
    };

    var data = this._apiRequestQueue.pop();
    while (data)
    {
        data.requestId = window.setTimeout(getOnTimeoutCallback(this._application, data.path),this. _requestTimeout);
        this._wpFrame.contentWindow.postMessage(JSON.stringify(data), this._application._webPlayerOrigin);
        data = this._apiRequestQueue.pop();
    }
}

// Modified by Dave Voutila, 9 Apr 2018
//spotfire.webPlayer.Application.isIE = navigator.appName.toLowerCase().indexOf("explorer") !== -1;
spotfire.webPlayer.Application.isIE = typeof navigator !== 'undefined'  ?
  navigator.appName.toLowerCase().indexOf("explorer") !== -1 : false;

spotfire.webPlayer.Document.prototype._deleteIFrames = function()
{
    var removeNode = function(parent, child)
    {
        if (!child)
        {
            return;
        }
        if (spotfire.webPlayer.Application.isIE && child.outerHTML)
        {
            child.outerHTML = "";
        }
        else
        {
            parent.removeChild(child);
        }
    };

    if (this._wpFrame)
    {
        removeNode(this._wpFrame.parentNode, this._wpFrame);
        this._wpFrame = null;
    }

    if (this._openProxyFrame) {
        removeNode(this._openProxyFrame.parentNode, this._openProxyFrame);
        this._openProxyFrame = null;
    }
};

//
// Internal State Management
//
spotfire.webPlayer._idleState = 0;
spotfire.webPlayer._busyState = 1;

spotfire.webPlayer.Document.prototype._setState = function (state)
{
    this._state = state;
};

spotfire.webPlayer.Application.prototype._isBusy = function ()
{
    for (var i = 0; i < this.analysisDocuments.length; i++)
    {
        if (this.analysisDocuments[i]._state === spotfire.webPlayer._busyState)
        {
            return true;
        }
    }

    return false;
};

spotfire.webPlayer.Application.prototype._isOpened = function ()
{
    return (this.analysisDocuments.length > 0);
};

// Modified by Dave Voutila
export default spotfire
